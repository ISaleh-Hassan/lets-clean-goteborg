import type { Metadata } from "next";
import { Footer, Header } from "@/components/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Let's Clean Göteborg – städning med omtanke", template: "%s | Let's Clean Göteborg" },
  description: "Städning och flytthjälp i Göteborg med omnejd. Se pris för flyttstädning och begär en kostnadsfri offert.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><head><script dangerouslySetInnerHTML={{ __html: `
    if (location.pathname === "/" && !location.hash && performance.getEntriesByType("navigation")[0]?.type === "reload" && "scrollRestoration" in history) {
      const previous = history.scrollRestoration;
      history.scrollRestoration = "manual";
      addEventListener("pageshow", () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        requestAnimationFrame(() => { history.scrollRestoration = previous; });
      }, { once: true });
    }
  ` }} /></head><body><a className="skip-link" href="#innehall">Hoppa till innehållet</a><Header /><main id="innehall">{children}</main><Footer /></body></html>;
}
