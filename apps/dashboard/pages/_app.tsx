import { Toaster } from 'react-hot-toast';

import React, { StrictMode } from 'react';
import Head from 'next/head';

import Page from 'components/system/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="robots" content="noindex" />
        <title>Sonaura</title>
      </Head>
      <StrictMode>
        <Page>
          <Component {...pageProps} />
          <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        </Page>
      </StrictMode>
    </>
  );
}

export default App;
