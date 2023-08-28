"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { useSelector } from "react-redux";
import HeaderApp from "@/components/HeaderApp";
import FooterApp from "@/components/FooterApp";
import Profile from "@/components/Profile";
import { Toaster } from "react-hot-toast";
import { NotLoggedIn } from "@/components/NotLoggedIn";
// import { Profile } from "../components/Profile/Profile";

const ProfilePage = () => {
  const router = useRouter();
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

      setProfile(profileRes);
    }
    if (address) {
      setProfile(null);
      getProfile();
    }
  }, [address]);

  return (
    <>
      <HeaderApp />
      <Toaster />
      {!!profile ? (
        <Profile
          profile={profile}
        />
      ) : 
      (!!address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      ))
        // <p>{"profile:" + JSON.stringify(profile) + "address:" + address}</p>
      }

      <FooterApp />
    </>
  );
};

export default ProfilePage;
