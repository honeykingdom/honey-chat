// https://github.com/vercel/next.js/blob/canary/examples/with-emotion-swc/pages/_app.tsx
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import createCache from '@emotion/cache';
import { CacheProvider, css, Global } from '@emotion/react';
import store from 'app/store';

const globalStyles = css`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Inter, Roobert, Helvetica Neue, Helvetica, Arial, sans-serif;
  }

  html {
    scrollbar-face-color: #111113;
    scrollbar-base-color: #111113;
    scrollbar-3dlight-color: #111113;
    scrollbar-highlight-color: #111113;
    scrollbar-track-color: #161618;
    scrollbar-arrow-color: #161618;
    scrollbar-shadow-color: #111113;
    scrollbar-dark-shadow-color: #111113;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  ::-webkit-scrollbar-button {
    background-color: #111113;
  }
  ::-webkit-scrollbar-track {
    background-color: #111113;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #161618;
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #111113;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-corner {
    background-color: #111113;
  }
  ::-webkit-resizer {
    background-color: #111113;
  }
`;

const cache = createCache({ key: 'next' });

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    <ReduxProvider store={store}>
      <Component {...pageProps} />
      <Global styles={globalStyles} />
    </ReduxProvider>
  </CacheProvider>
);

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
};

export default App;
