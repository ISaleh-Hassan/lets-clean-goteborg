import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/site";
import { MotionProvider } from "@/components/reveal";

export const metadata: Metadata = {
  title: "LSG | Städning och flytthjälp i Göteborg",
  description: "Få hjälp med flyttstädning, hemstädning och flytthjälp i Göteborg. Räkna på flyttstädning direkt och be om en tydlig offert.",
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
