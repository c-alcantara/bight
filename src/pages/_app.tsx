// src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout"; // Adjust the path based on your structure

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
