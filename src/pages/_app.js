import '../styles/globals.css'; // Import your Tailwind CSS file
import 'highlight.js/styles/github-dark.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head'; // Import Head for managing the <head> section
import { useRouter } from 'next/router'; // Import useRouter to access the current route
import Script from 'next/script';
import { StaticDelivr } from 'staticdelivr';
import { Toaster } from '@/components/ui/sonner';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

StaticDelivr.set({ baseURL: 'https://staticdelivr.com' });

function MyApp({ Component, pageProps }) {
  const router = useRouter(); // Get the current route

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ParallaxProvider>
        <DefaultSeo {...SEO} />
        <Head>
          <link rel="icon" type="image/svg+xml" href="/assets/img/icons/favicon.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/icons/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon.png" />
        </Head>
        <Component {...pageProps} />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c['clarity'] = c['clarity'] || function() { (c['clarity'].q = c['clarity'].q || []).push(arguments) };
                i = l.createElement('script'); 
                i.async = 1; 
                i.src = 'https://www.clarity.ms/tag/' + '${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}';
                t = l.getElementsByTagName('script')[0]; 
                t.parentNode.insertBefore(i, t);
              })(window, document, 'clarity', '${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}');
            `,
          }}
        />
        <Toaster position="bottom-right" richColors />
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default MyApp;
