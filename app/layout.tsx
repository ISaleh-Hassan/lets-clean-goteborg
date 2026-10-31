import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/site";
import { MotionProvider } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Let's Clean Göteborg | Städning med omtanke",
  description: "Trygg städning och flytthjälp i Göteborg. Fast pris, 15 dagars garanti och RUT-avdrag direkt på fakturan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
