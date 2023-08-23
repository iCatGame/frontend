'use client'

import FooterApp from "@/components/FooterApp";
import HeaderApp from "@/components/HeaderApp";
import { Loader } from "@/components/Loader";
import Profile from "@/components/Profile";
import React, { useEffect, useState } from "react";

const Dashboard = ({ params }) => {

    const [profile, setProfile] = useState(null);
    const [address, setAddress] = useState(`0x`);

    const fetchProfile = async(nick_name) => {
        try {
            const responce = await fetch(`/api/get_detail?nick_name=${nick_name}`, {
                method: 'GET',
                headers: {
                    Accepts: 'application/json'
                }
            });
            const data = (await responce.json())[0];
            return data;
        }
        catch (e) {
            return {};
        }
    }

    useEffect(() => {
        async function getDetail() {
            const detailRes = await fetchProfile(params.nick_name);
            setProfile(detailRes);
            // console.log(detailRes)
        }
        getDetail();
        // console.log(profile)
    }, [profile])

    return (
        <div>
            <HeaderApp />
            {!!profile ? (
                <Profile
                profile={profile}
                />
            ) : 
                <Loader />
            }
            <FooterApp />
        </div>
    )
}

export default Dashboard;