import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from "next/font/local";
import Script from 'next/script';
import "./globals.css";

const roboto = localFont({
  src: "./fonts/roboto-v32-latin-regular.woff2",
  subsets: ['latin'],
  variable: "--font-sans",
  weight: "400",
  display: "swap",
});

const merriweather = localFont({
  fontFamily: "Merriweather",
  src: "./fonts/merriweather-v33-latin-600.woff2",
  subsets: ['latin'],
  variable: "--font-serif",
  weight: "600",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17217525645"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17217525645');
          `}
        </Script>
      </head>
      <body className={`${roboto.variable} ${merriweather.variable} scroll-smooth antialiased`}>
         <meta name="google-site-verification" content="SQZ5qtXfEeDLpxHWjDt1Dklyuftq2PY1OtTdp4uJYVY" />
        {children}
         <GoogleAnalytics gaId="G-7NVDC46MSG" />
      </body>
    </html>
  );
}
