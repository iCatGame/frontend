import store from '@/lib/redux/store';
import Head from 'next/head';
import { Provider } from 'react-redux';

// const inter = Inter({ subsets: ['latin'] })

export default function ProfileLayout({ children }) {
  return (
    <section>
      <Head>
        <title>Profile</title>
      </Head>
        <h2>dashboard layout</h2>
        {/* <Provider store={store} > */}
            {children}
        {/* </Provider> */}
    </section>
  )
}
