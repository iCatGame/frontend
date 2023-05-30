'use client';

import * as React from 'react';
import ReactDOM from 'react-dom';
// import Auth from './authWrapper';
// import '/src/polyfills';

// rainbowkit login
import '@rainbow-me/rainbowkit/styles.css';
import { 
  connectorsForWallets, 
  getDefaultWallets, 
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  AuthenticationStatus
} from '@rainbow-me/rainbowkit';
import { 
  imTokenWallet, 
  trustWallet, 
  tahoWallet, 
  zerionWallet 
} from '@rainbow-me/rainbowkit/wallets';
import { SiweMessage } from 'siwe';
import { 
  configureChains, 
  createConfig, 
  WagmiConfig 
} from 'wagmi';
import { 
  mainnet, 
  polygon, 
  optimism, 
  arbitrum, 
  arbitrumGoerli, 
  optimismGoerli 
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      mainnet,
      polygon,
      optimism,
      arbitrum,
      arbitrumGoerli,
      optimismGoerli,
    //   ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [
        alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}),
        publicProvider()
    ]
  );
  
  const { wallets } = getDefaultWallets({
    appName: 'blockchain game',
    projectId,
    chains,
  });

  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: '更多钱包',
      wallets: [
        imTokenWallet({ projectId, chains }),
        trustWallet({ projectId, chains }),
        // ledgerWallet({ projectId, chains }),
        tahoWallet({ projectId, chains }),
        zerionWallet({ projectId, chains }),
      ],
    },
  ]);
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <WagmiConfig config={wagmiConfig}>
//         <RainbowKitProvider chains={chains} coolMode >
//           <App />
//           {/* <Auth Component={App}/> */}
//         </RainbowKitProvider>
//       </WagmiConfig>
//     </React.StrictMode>
//   );

const getSiweMessageOptions = () => ({
  statement: '登录基于AIGC的区块链游戏网站',
});

export function Providers({ children }) {
    const [mount, setMount] = React.useState(false);
    const fetchingStatusRef = React.useRef(false);
    const verifyingRef = React.useRef(false);
    const [authStatus, setAuthStatus] = React.useState('loading');

    React.useEffect(() => {
      setMount(true);

      // fetch user when
      const fetchStatus = async () => {
        if (fetchingStatusRef.current || verifyingRef.current) {
          return;
        }

        fetchingStatusRef.current = true;

        try {
          const responce = await fetch('api/me');
          const json = await responce.json();
          setAuthStatus(json.address ? 'authenticated' : 'unauthenticated');
        }
        catch (e) {
          console.log(e);
          setAuthStatus('unauthenticated');
        }
        finally {
          fetchingStatusRef.current = false;
        }
      }

      // 1.refresh
      fetchStatus();

      // 2.window is focused (in case user logs out of another window)
      window.addEventListener('focus', fetchStatus);
      return () => window.removeEventListener('focus', fetchStatus);
    }, []);


    const getNonce = async () => {
      const response = await fetch('/api/nonce');
      return await response.text();
  }
  
  const createMessage = ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: '登录基于AIGC的区块链游戏网站',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    }
  
  const getMessageBody = ({ message }) => {
      return message.prepareMessage();
    }
  
  const verify = async ({ message, signature }) => {
      verifyingRef.current = true;
  
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, signature }),
        });
  
        const authenticated = Boolean(response.ok);
  
        if (authenticated) {
          setAuthStatus(authenticated ? 'authenticated' : 'unauthenticated');
        }
  
        return authenticated;
      } catch (error) {
        return false;
      } finally {
        verifyingRef.current = false;
      }
    }
  
  const signOut = async () => {
      setAuthStatus('unauthenticated');
      await fetch('/api/logout');
    }
  
  const authAdapter = React.useMemo(() => {
      return createAuthenticationAdapter({ getNonce, createMessage, getMessageBody, verify, signOut});
    }, []);


    return (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitAuthenticationProvider 
            getSiweMessageOptions={getSiweMessageOptions}
            adapter={authAdapter}
            status={authStatus}
          >
            <RainbowKitProvider chains={chains} coolMode >
            {mount && children}
            </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
        </WagmiConfig>
    )
}