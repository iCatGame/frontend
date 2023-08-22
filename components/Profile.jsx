import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Layout } from 'antd';
import { ProfileImage } from './ProfileImage';
import { useRouter } from 'next/navigation';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import eggAbi from "@/lib/abi/eggAbi";
import icatAbi from "@/lib/abi/catAbi";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ProfileCover } from './ProfileCover';
import Link from 'next/link';
const { Meta } = Card;

const Profile = ({ profile }) => {
  const router = useRouter();
  const { address } = useAccount();
  const tokenId = 0;

  const [activeTabKey, setActiveTabKey] = useState('iCat');
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_EGG_CONTRACT_ADDRESS,
    abi: eggAbi,
    functionName: 'hatchOut',
    args: [tokenId]
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "孵化"
      })
    }
  }, [data, isSuccess])

  const tabList = [
    {
      key: "Egg",
      label: "Egg"
    },
    {
      key: "iCat",
      label: "iCat"
    }
  ];
  const contentList = {
    iCat: 
    <div className='flex flex-row space-x-4 py-8'>
      <Card
        // style={{
        // width: 300,
        // cursor: 'pointer'
        // }}
        className='w-72 hover:shadow-lg cursor-pointer'
        cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        }
        actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
        ]}
        onClick={() => router.push(`/asset/${tokenId}`)}
      >
        <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title="Card title"
        description="This is the description"
        />
      </Card>
      <Card
        // style={{
        // width: 300,
        // cursor: 'pointer'
        // }}
        className='w-72 hover:shadow-lg cursor-pointer'
        cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        }
        actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
        ]}
        onClick={() => router.push(`/asset/${tokenId}`)}
        >
        <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title="Card title"
        description="This is the description"
        />
        </Card>
        <Card
        // style={{
        // width: 300,
        // cursor: 'pointer'
        // }}
        className='w-72 hover:shadow-lg cursor-pointer'
        cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        }
        actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
        ]}
        onClick={() => router.push(`/asset/${tokenId}`)}
    >
        <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title="Card title"
        description="This is the description"
        />
    </Card>
    </div>,
    Egg: 
    <div>
        <Card
            className='w-72 hover:shadow-lg cursor-pointer'
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
                <button disabled={!write} onClick={() => write?.()} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isLoading ? "bg-emerald-500" : isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isLoading ? "孵化中..." : isSuccess ? "孵化成功！" : "孵化"}
              </button>
            ]}
        >
            <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
            title="Card title"
            description="This is the description"
            />
        </Card>
    </div>
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
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
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