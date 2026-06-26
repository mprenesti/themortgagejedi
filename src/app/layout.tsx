import type { Metadata } from "next";
import { Rajdhani, Inter, Bebas_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Las Vegas Mortgage Broker | Mike Prenesti ${SITE.nmls}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Mike Prenesti, The Mortgage Jedi. Payment first mortgage guidance for Las Vegas homebuyers. FHA, VA, Conventional, DSCR, and more. NMLS #1033445.",
  keywords: [
    "Las Vegas mortgage broker",
    "Mike Prenesti",
    "The Mortgage Jedi",
    "FHA loan",
    "VA loan",
    "DSCR loan",
    "Nevada mortgage",
  ],
  openGraph: {
    title: "The Mortgage Jedi | Las Vegas Mortgage Broker",
    description: "Payment first mortgage guidance for Las Vegas homebuyers.",
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mortgage Jedi | Las Vegas Mortgage Broker",
    description: "Payment first mortgage guidance for Las Vegas homebuyers.",
    images: ["/images/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${inter.variable} ${bebas.variable} font-body`}
      >
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <MobileStickyCTA />

        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}

        {FB_PIXEL_ID ? (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
