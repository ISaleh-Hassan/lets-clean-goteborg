import type { Metadata } from "next";
import { Footer, Header } from "@/components/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Let's Clean Göteborg – städning med omtanke", template: "%s | Let's Clean Göteborg" },
  description: "Städning och flytthjälp i Göteborg med omnejd. Se pris för flyttstädning och begär en kostnadsfri offert.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body><a className="skip-link" href="#innehall">Hoppa till innehållet</a><Header /><main id="innehall">{children}</main><Footer /></body></html>;
}
