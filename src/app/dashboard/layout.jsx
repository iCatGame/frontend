import '/src/style/globals.css';

// const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }) {
  return (
    <section>
        <h2>dashboard layout</h2>
        {children}
    </section>
  )
}
