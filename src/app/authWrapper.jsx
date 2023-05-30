import React from 'react';

// rainbowkit auth
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import {
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const getSiweMessageOptions = () => ({
    statement: 'Sign in to the RainbowKit + SIWE example app',
  });

export default function Auth({
  Component,
  pageProps
}) {
  return (
    <WagmiConfig {...etc} >
      <SessionProvider refetchInterval={0} session={pageProps.session} >
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}
  