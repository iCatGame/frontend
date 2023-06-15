import '/src/style/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
// import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <section>
        <Providers>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, }}>
              <ConnectButton />
          </div>
          {children}
        </Providers>
    </section>
  )
}
