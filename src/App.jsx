import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Homepage = lazy(() => import('./pages/homepage'));
const Profile = lazy(() => import('./pages/profile'));

const App = () => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, }}>
                <ConnectButton />
            </div>
            <Router>
                <Suspense fallback={<p>加载中...</p>}>
                    <Routes>
                        <Route exact path="/" element={<Homepage />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Suspense>
            </Router>
        </div>
    )
}

export default App;