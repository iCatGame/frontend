'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";

const App = () => {
    const account = useAccount();
    console.log('wallet object:', account)
    // console.log('env', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, }}>
                {/* <ConnectButton /> */}
            </div>
            <h1>主页</h1>
            <Link href="/">Homepage</Link>
            <Link href="/profile">个人主页</Link>
            <Link href="/dashboard">Dashboard</Link>
        </div>
    )
}

export default App;