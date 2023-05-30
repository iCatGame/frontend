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
  RainbowKitProvider 
} from '@rainbow-me/rainbowkit';
import { 
  imTokenWallet, 
  trustWallet, 
  tahoWallet, 
  zerionWallet 
} from '@rainbow-me/rainbowkit/wallets';
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

const projectId = process.env.WALLETCONNECT_PROJECT_ID;

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
        alchemyProvider({apiKey: process.env.ALCHEMY_API_KEY}),
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

export function Providers({ children }) {
    const [mount, setMount] = React.useState(false);
    React.useEffect(() => setMount(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} coolMode >
                {mount && children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}