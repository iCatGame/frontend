import React, { useEffect, useState } from 'react';
import { Avatar, Card, Layout } from 'antd';
import { ProfileImage } from './ProfileImage';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ProfileCover } from './ProfileCover';
import Link from 'next/link';
import EggCards from './EggCards';
import CatCards from './CatCards';
import { Stuff } from './Stuff';

const Profile = ({ profile }) => {
  const { address } = useAccount();

  const [activeTabKey, setActiveTabKey] = useState('iCat');
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const tabList = [
    {
      key: "Egg",
      label: "Egg"
    },
    {
      key: "iCat",
      label: "iCat"
    },
    address == profile?.address &&
    {
      key: "stuff",
      label: "物品"
    }
  ];
  const contentList = {
    iCat: <div className='flex justify-center lg:justify-start'>
            <CatCards address={profile?.address} />
          </div>,
    Egg: <div className='flex justify-center lg:justify-start'>
          <EggCards address={profile?.address} />
        </div>,
    stuff: address === profile?.address ? <Stuff /> : null
  }

  return (
    <div>
      <ProfileCover profile={profile} />
      <div className='mt-[-170px]'>
        <ProfileImage profile={profile} />
        <div className='flex justify-between'>
          <div>
            <p className='text-2xl font-bold px-8 pt-6'>
                {profile?.nick_name || 'User'}
            </p>
            <p className='text-sm text-gray-500 px-8 pb-4 pt-3'>
                {profile?.bio || "该用户没有留下简介。"}
            </p>
          </div>
          {address == profile?.address &&
            <Link href="/settings" className='flex flex-row px-8 text-gray-500 hover:text-black gap-x-[5px]'>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <p>编辑</p>
            </Link>
            }
        </div>
        <div className='bg-gradient-to-b'>
            <Card 
              className='mx-2 text-left lg:mx-8'
              bordered={false}
              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={onTabChange}
            >
              {contentList[activeTabKey]}
            </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile;