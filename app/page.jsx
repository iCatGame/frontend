'use client'

import React, { useRef } from "react";
import Link from "next/link";

import { ScrollSmoother } from "@/components/gsap";
import useLayoutEffect from "@/components/use-isomorpphic-layout-effect";

import Landing from "@/components/Landing";
import About from "@/components/About";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import NavBar from "@/components/Navbar";

// const App = () => {
//     // const account = useAccount();
//     // console.log('wallet object:', account)
//     // console.log('env', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, }}>
//                 {/* <ConnectButton /> */}
//             </div>
//             <h1>主页</h1>
//             <Link href="/">Homepage</Link>
//             <Link href="/profile">个人主页</Link>
//             <Link href="/dashboard">Dashboard</Link>
//         </div>
//     )
// }

// export default App;

const App = () => {

  const smoother = useRef(null)

  useLayoutEffect(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      ignoreMobileResize: true,
    }).paused(true);

    setTimeout(() => {
      scrollPaused(false)
    },2900)
  }, [])

  const scrollPaused = (state) => {
    smoother.current ? smoother.current.paused(state) : null
  }

  const scrollToSection = (id) => {
    smoother.current.scrollTo(id, true, "top 200px")
  }

  return (
    <div>
      <main id="smooth-wrapper">
        <div id="smooth-content" className="will-change-transform">
          <Landing scrollTo={scrollToSection}/>
          <About />
          <Features />
          <Footer />
        </div>
        <NavBar scrollTo={scrollToSection} scrollPaused={scrollPaused}/>
        <Loader />
      </main>
    </div>
  )
}

export default App;