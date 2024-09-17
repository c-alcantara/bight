//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
//import "../styles/globals.css";
import localFont from 'next/font/local';

//const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

// export const metadata: Metadata = {
//   title: "bight",
//   description: "bight...",
//   icons: [
//     { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicons/apple-touch-icon.png' },
//     { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicons/favicon-32x32.png' },
//     { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicons/favicon-16x16.png' },
//     { rel: 'manifest', url: '/favicons/site.webmanifest' },
//     { rel: 'mask-icon', url: '/favicons/safari-pinned-tab.svg', color: '#EFEFEF' },
//     { rel: 'shortcut icon', url: '/favicons/favicon.ico' },
//   ],
//   other: {
//     'msapplication-TileColor': '#EFEFEF',
//     'msapplication-config': '/favicons/browserconfig.xml',
//     'theme-color': '#EFEFEF',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
