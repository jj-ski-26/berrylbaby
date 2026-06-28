import type { Metadata } from "next";
import { Vidaloka } from "next/font/google";
import "./globals.css";

const vidaloka = Vidaloka({ subsets: ["latin"], weight: "400", variable: "--font-vidaloka" });

export const metadata: Metadata = {
  title: "BerrylBaby",
  description: "Reserveer je sessie bij BerrylBaby",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${vidaloka.variable} bg-white text-[#666] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
