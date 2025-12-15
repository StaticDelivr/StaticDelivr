import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to external domains for faster loading */}
          <link rel="preconnect" href="https://stats.staticdelivr.com" />
          <link rel="preconnect" href="https://cdn.staticdelivr.com" />
          <link rel="preconnect" href="https://www.clarity.ms" />
          <link rel="preconnect" href="https://scripts.clarity.ms" />
          
          {/* Microsoft Clarity Tracking Script - Deferred for better performance */}
          <script
            type="text/javascript"
            defer
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
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
