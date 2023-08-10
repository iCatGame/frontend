import '../../styles/page.module.css';
import Head from 'next/head';

// const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }) {
  return (
    <section>
      <Head>
        <title>Dashboard</title>
      </Head>
        <h2>dashboard layout</h2>
        {children}
    </section>
  )
}
