import "./globals.css";

import Script from "next/script"

import { PopupProvider } from "@/context/PopupContext";

import MainLayout from "@/components/layout/MainLayout/MainLayout";

export const metadata = {
  metadataBase: new URL('https://jainscomputer.com'),
  title: "Jains Computer",
  description: "Best Computer Institute",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {

  return (

    <html lang="en" data-scroll-behavior="smooth">

      <head>

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PHN4294M');`
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18021481975"
          strategy="lazyOnload"
        />

        <Script id="google-ads-tag" strategy="lazyOnload">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18021481975');
  `}
        </Script>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>


        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PHN4294M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>


        <PopupProvider>

          <MainLayout>

            {children}

          </MainLayout>

        </PopupProvider>

      </body>

    </html>

  );
}