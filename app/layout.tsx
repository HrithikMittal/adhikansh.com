import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adhikansh Mittal — Co-Founder & CTO, Coraltalk",
  description:
    "Co-Founder & CTO at Coraltalk (AI-powered spoken assessment; 10+ schools). Founder of Staymod and Eatmod. Bengaluru.",
  keywords: [
    "Adhikansh Mittal",
    "Coraltalk",
    "CTO",
    "spoken assessment",
    "Staymod",
    "Eatmod",
    "EdTech",
    "AI",
  ],
  authors: [{ name: "Adhikansh Mittal" }],
  openGraph: {
    title: "Adhikansh Mittal — Co-Founder & CTO, Coraltalk",
    description:
      "Co-Founder & CTO at Coraltalk. Side projects: Staymod & Eatmod in production. Notes on LinkedIn.",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
