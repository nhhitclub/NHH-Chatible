import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Script from 'next/script';
import Head from 'next/head';
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, []);

  return (
    <>
      <Head>
        <title>NHH Chatible</title>
        <link rel="icon" href='//upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Echo_chat_icon.svg/1024px-Echo_chat_icon.svg.png' sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}


export default MyApp;