import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { analytics } from "@/lib/firebase";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lucas-guerrier.fr'),
  title: "Portfolio - Lucas Guerrier",
  description: "Portfolio de développeur web spécialisé en React, Next.js et TypeScript.",
  keywords: ["développeur web", "portfolio", "React", "Next.js", "TypeScript", "Lucas Guerrier"],
  authors: [{ name: "Lucas Guerrier" }],
  openGraph: {
    title: "Portfolio - Lucas Guerrier",
    description: "Portfolio de développeur web spécialisé en React, Next.js et TypeScript.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.lucas-guerrier.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen pt-16">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
