import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Microsoft Clarity Tracking Script */}
          <script
            type="text/javascript"
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
