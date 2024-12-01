// pages/_app.js
import '../styles/globals.css'; // Import your Tailwind CSS file
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from 'next/head'; // Import Head for managing the <head> section

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
      </Head>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
