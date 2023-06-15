'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import Head from "next/head";

const App = () => {
    const account = useAccount();
    console.log('wallet object:', account)
    // console.log('env', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    return (
        <div>
            <Head>
                <title>区块链游戏</title>
                <meta name="description" content="基于 AIGC 的区块链游戏" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, }}>
                <ConnectButton />
            </div>
            <h1>主页</h1>
            <Link href="/">Homepage</Link>
            <Link href="/profile">个人主页</Link>
        </div>
    )
}

export default App;