import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  public get fonts() {
    const fontsLis = [
      'family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900',
      'family=Open+Sans:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900',
      'family=Fira+Code:wght@400;700',
    ];
    return fontsLis.join('&');
  }

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <base href="/" />
          <link rel="icon" href="img/favicon.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?${this.fonts}&display=swap`}
          />
        </Head>
        <body className="minha-classe">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
