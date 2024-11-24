// pages/_app.js
import '../styles/globals.css'; // Import your Tailwind CSS file
import { ParallaxProvider } from 'react-scroll-parallax';

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
