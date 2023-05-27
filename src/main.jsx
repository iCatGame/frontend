import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import './polyfills';

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
import { createClient } from 'viem';

const projectId = 'ca4f0eccaff2ce33ba2f7c3f03909ba2';

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
        alchemyProvider({apiKey: `cgMywaZ27K503pNh1blNZYPER4gS5Eko`}),
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

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode >
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );