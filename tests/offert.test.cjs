const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const source = readFileSync("app/api/offert/route.ts", "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const valid = { name: "Test", email: "test@example.com", phone: "0123", location: "Göteborg", service: "flyttstadning", area: "200", message: "Balkong" };
const configured = { RESEND_API_KEY: "test-key", QUOTE_EMAIL_FROM: "test@example.com", QUOTE_EMAIL_TO: "recipient@example.com" };

function route({ env = configured, fetch = async () => new Response(null, { status: 200 }) } = {}) {
  const exports = {};
  const context = {
    exports, Response, Request, TextDecoder, Number, JSON,
    process: { env },
    console: { error() {} },
    fetch,
    require(name) {
      if (name === "@/lib/services") return { services: [{ slug: "flyttstadning", name: "Flyttstädning" }, { slug: "dodsbo", name: "Dödsbo" }, { slug: "hemstadning", name: "Hemstädning" }] };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  };
  vm.runInNewContext(code, context);
  return exports.POST;
}

function request(data = valid) {
  return new Request("http://localhost/api/offert", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
}

test("sends verified fields to provider with visitor reply-to", async () => {
  let sent;
  const post = route({ fetch: async (url, options) => {
    sent = { url, headers: options.headers, body: JSON.parse(options.body) };
    return new Response(null, { status: 200 });
  } });
  const response = await post(request());
  assert.equal(response.status, 200);
  assert.equal(sent.url, "https://api.resend.com/emails");
  assert.equal(sent.headers.Authorization, "Bearer test-key");
  assert.equal(sent.body.reply_to, valid.email);
  assert.match(sent.body.text, /Storlek: 200 m²/);
  assert.equal(sent.body.to[0], configured.QUOTE_EMAIL_TO);
});

test("reports missing configuration without invoking provider", async () => {
  const post = route({ env: {}, fetch: async () => { throw new Error("must not send"); } });
  const response = await post(request());
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /inte tillgängligt/);
});

test("rejects malformed or invalid form inputs", async () => {
  const post = route();
  for (const data of [
    { ...valid, email: "bad\r\nbcc@example.com" },
    { ...valid, service: "unknown" },
    { ...valid, area: "2.5" },
    { ...valid, service: "dodsbo", area: "20" },
    { ...valid, frequency: "Varje vecka" },
    { ...valid, message: "x".repeat(3001) },
  ]) assert.equal((await post(request(data))).status, 400);
  const oversized = new Request("http://localhost/api/offert", { method: "POST", headers: { "content-type": "application/json" }, body: "x".repeat(17000) });
  assert.equal((await post(oversized)).status, 400);
});

test("reports provider rejection and network failures", async () => {
  assert.equal((await route({ fetch: async () => new Response(null, { status: 429 }) })(request())).status, 502);
  assert.equal((await route({ fetch: async () => { throw new Error("network"); } })(request())).status, 502);
});
