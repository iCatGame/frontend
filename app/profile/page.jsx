"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { useSelector } from "react-redux";
// import { Profile } from "../components/Profile/Profile";

const ProfilePage = () => {
  const router = useRouter();
  const address = useSelector((state) => state.address.address);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async ({ address }) => {
    try {
      const responce = await fetch(`/api/get_profile?address=${address}`, {
        method: 'GET',
        headers: {
          Accepts: 'application/json'
        }
      });
      return responce.json();
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
      <Head>
        <title>My Profile | iCat</title>
        <meta property="og:title" content={`My Profile | iCat`} />
      </Head>

      {/* {!!profile ? (
        <Profile
          profile={profile}
          tab={router.query.tab ? String(router.query.tab) : 0}
        />
      ) : address ? ( */}
        <Loader />
        <p>{"profile:" + JSON.stringify(profile) + "address:" + address}</p>
      {/* ) : (
        <NotLoggedIn />
      )} */}
    </>
  );
};

export default ProfilePage;
