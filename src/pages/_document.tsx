import { Html, Head, Main, NextScript } from 'next/document';

// const gaScript = `
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', '${process.env.GA_TRACKING_ID}', { page_path: window.location.pathname });
// `;

const Document = () => (
  <Html lang="ru">
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-title" content="Honey Chat" />
      <meta name="application-name" content="Honey Chat" />
      <meta name="theme-color" content="#0e0e10" />
      {/* <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
      />
      <script dangerouslySetInnerHTML={{ __html: gaScript }} /> */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
