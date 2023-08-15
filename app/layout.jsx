"use client"

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
// import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Provider } from 'react-redux';
import store from '@/lib/redux/store';
import Head from "next/head";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: '区块链游戏',
//   description: 'A blockchain game based on AIGC',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>iCat</title>
        <meta property="og:description" content="A blockchain game based on AIGC" />
        <meta charSet="utf-8" />
        <link rel='icon' href='favicon.ico' />
      </Head>
      <body>
        <Provider store={store}>
        <Providers>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, position: 'absolute', zIndex: 1, right: 0 }}>
              <ConnectButton />
          </div>
          {children}
        </Providers>
        </Provider>
      </body>
    </html>
  )
}
