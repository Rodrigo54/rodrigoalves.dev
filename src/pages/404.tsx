import React from 'react';
import Link from 'next/link';
import Layout from '@components/layout';
import SEO from '@components/seo';
import PaperLayout from '@components/paper-layout';

// styles
const pageStyles = {
  color: 'var(--color2-contrast)',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404 Not found" />
      <PaperLayout>
        <main style={pageStyles}>
          <title>Not found</title>
          <h1 style={headingStyles}>Page not found</h1>
          <p style={paragraphStyles}>
            Sorry{' '}
            <span role="img" aria-label="Pensive emoji">
              😔
            </span>{' '}
            we couldn’t find what you were looking for.
            <br />
            <br />
            <Link href="/">
              <a>Go home</a>
            </Link>
            .
          </p>
        </main>
      </PaperLayout>
    </Layout>
  );
};

export default NotFoundPage;
