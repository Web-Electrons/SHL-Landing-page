import { Inter } from "next/font/google";
import './globals.scss'
import { Loaders } from "../components/ui/loaders";
import Script from "next/script";
export const metadata = {
  title: "ShipLink",
  description: "Worldwide best package forwarding service",
}
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Google Analythics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2TXD709TE7"></Script>
        <Script
          id="google-analythics"
        >
          {
            `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2TXD709TE7');
            `
          }
        </Script>
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.shiplink.com/en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ShipLink - Best Package Forwarding Service" />
        <meta property="og:description" content="ShipLink is the world's best package forwarding service, offering worldwide coverage and secure shipping." />
        <meta property="og:image" content="https://www.shiplink.com/_next/static/media/shipLink_preview.841c909a.png"></meta>

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="w3.shiplink.ca" />
        <meta property="twitter:url" content="https://www.shiplink.com/en" />
        <meta name="twitter:title" content="ShipLink - Best Package Forwarding Service" />
        <meta name="twitter:description" content="ShipLink is the world's best package forwarding service, offering worldwide coverage and secure shipping." />
        <meta name="twitter:image" content="https://www.shiplink.com/_next/static/media/shipLink_preview.841c909a.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}