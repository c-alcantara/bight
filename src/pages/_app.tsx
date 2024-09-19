import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"
import Head from "next/head"; // Import Head for metadata

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Your App Title</title>
        <meta name="description" content="Your app description" />
        {/* Add other meta tags as needed */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
