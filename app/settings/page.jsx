"use client";

import FooterApp from '@/components/FooterApp';
import HeaderApp from '@/components/HeaderApp';
import { Loader } from '@/components/Loader';
import Settings from '@/components/Settings';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SettingsPage() {
  const address = useSelector((state) => state.address.address);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async ( address ) => {
    try {
      const responce = await fetch(`/api/get_profile?address=${address}`, {
        method: 'GET',
        headers: {
          Accepts: 'application/json'
        }
      });
      const data = (await responce.json())[0];
      // console.log('res:', data)
      return data;
    }
    catch (e) {
      return {};
    }
  }

  useEffect(() => {
    async function getProfile() {
      // console.log('address:', address)
      const profileRes = await fetchProfile(address);
      // console.log(address, profileRes)
      setProfile(profileRes);
    }
    if (address) {
      // setProfile(null);
      getProfile();
    }
  }, [address]);
  return (
    <div>
      <HeaderApp />
      {!!profile ? (
        address == profile?.address ? (
          <Settings
            profile={profile}
          />
        ) :
        <ConnectButton className="h-full" />
      ) : 
        <Loader />
      }
      <FooterApp />
    </div>
  )
}