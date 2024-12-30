// pages/_app.js
import '../styles/globals.css'; // Import your Tailwind CSS file
import { ParallaxProvider } from 'react-scroll-parallax';
import Head from 'next/head'; // Import Head for managing the <head> section
import { useRouter } from 'next/router'; // Import useRouter to access the current route
import { StaticDelivr } from 'staticdelivr';

StaticDelivr.set({ baseURL: 'https://staticdelivr.com' });

function MyApp({ Component, pageProps }) {
  const router = useRouter(); // Get the current route
  const baseUrl = 'https://staticdelivr.com';

  return (
    <ParallaxProvider>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/img/icons/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon.png" />
        {/* Add the canonical URL dynamically */}
        <link rel="canonical" href={`${baseUrl}${router.asPath}`} />
      </Head>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
