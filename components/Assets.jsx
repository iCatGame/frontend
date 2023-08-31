import Image from "next/image";
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi";
import iCatAbi from "@/lib/abi/catAbi.json";
import eggAbi from "@/lib/abi/eggAbi.json";
import { Loader } from "./Loader";
import Button from "./Button";
import { FeedModal } from "./FeedModal";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

const Assets = ({ tokenId }) => {
  const [isDead, setIsDead] = useState(false);
  const [owner, setOwner] = useState("");
  const { address } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const iCatCA = {
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi
  }
  
  const { data , isSuccess } = useContractReads({
    contracts: [
      {
        ...iCatCA,
        functionName: 'tokenURI',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'detail',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateHealth',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateFeces',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateHunger',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'calculateIntimacy',
        args: [tokenId]
      }, 
      {
        ...iCatCA,
        functionName: 'ownerOf',
        args: [tokenId]
      }
    ]
  })
  // console.log(data, isSuccess)

  const stage = {
    0: "幼生期",
    1: "成长期",
    2: "成熟期"
  }

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'changeNickname',
    args: [tokenId, newNickname]
  })

  const { data: tx, isLoading, isSuccess: isWSuccess, write } = useContractWrite(config);

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      if (data?.[2].result == 0) {
        toast.error("哎呀，由于你的疏忽，这只猫咪已经死亡了，将它埋葬吧！");
        setIsDead(true);
      }
      setOwner(data?.[6].result);
      // console.log('aaa', isModalOpen)
    }
    if (isWSuccess) {
      toast.success("修改成功！");
      setIsModalOpen(false);
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `修改昵称`
      })
    }
  }, [isSuccess, owner, isWSuccess]);

  return (
    isSuccess ?
    <div className="mx-[204px] my-0 gap-[20px] max-w-[1280px] px-10 pt-[40px] pb-[60px] gap-y-5 flex-col flex">
      <Toaster />
      <div className="grid grid-cols-[320px,1fr] gap-10 relative antialiased">
        <div className="aspect-square bg-white bg-clip-border bg-opacity-100 bg-origin-padding bg-no-repeat bg-auto rounded-xl box-border text-black block overflow-hidden relative antialiased h-[320px]">
          <Image src={"/images/qr.png"} width={320} height={320}/>
        </div>
        <div className="box-border text-black gap-5 gap-y-5 display-flex flex-col h-[180px] m-0 w-[650px] antialiased">
          <div className="flex flex-row justify-start items-center gap-1">
            <p className="box-border text-black block font-sans font-extrabold text-3xl h-10 antialiased overflow-hidden">
              iCat #{tokenId} {data?.[1]?.result[0]} {isDead && "(已死亡☠️)"}
            </p>
            {
              // !isDead && 
              owner == address && 
              <div className="relative">
                <div
                  className="flex flex-row justify-center items-center font-extrabold cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" onClick={() => setIsModalOpen(true)}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <Modal 
                    title="给你的iCat取个名字吧！"
                    open={isModalOpen}
                    closable={true}
                    maskClosable={true}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                  >
                    <div className="flex flex-col justify-center items-center gap-4 pt-4">
                      <input type='text' placeholder="请输入新昵称" className="ps-3 focus:outline-none w-[50%] h-[30px] drop-shadow rounded-lg" value={newNickname} onChange={a => {setNewNickname(a.target.value)}}/>
                      <button disabled={!write} onClick={() => write?.()} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isLoading ? "bg-emerald-500" : isWSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {isLoading ? `修改中...` : isWSuccess ? `修改成功！` : `修改昵称`}
                      </button>
                    </div>
                  </Modal>
                </div>
                {isHovered && (
                  <div className="flex justify-center items-center opacity-50 absolute top-[100%] left-0 w-40 bg-gray-300 p-2 rounded shadow-lg">
                    修改你的iCat名字
                  </div>
                )}
              </div>
            }
          </div>
          <div className="grid grid-cols-2 gap-4 font-mono text-black text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg pt-10">
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              阶段：{stage[data?.[1].result[3]]}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              健康度：{Number(data?.[2].result)}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              饥饿度：{Number(data?.[4].result)}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              排泄物：{Number(data?.[3].result)}
            </div>
            <div className="p-4 rounded-lg shadow-lg bg-white drop-shadow-2xl">
              亲密度：{Number(data?.[5].result)}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-solid rounded-xl box-border text-black block font-sans w-[1048px] mt-10 antialiased">
        <div className="grid grid-cols-3 gap-x-20 gap-y-10 font-mono text-white text-sm text-center justify-center items-center font-bold leading-6 bg-stripes-fuchsia rounded-lg p-4">
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"撸猫"} func={"pet"} />
          </div>}
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"铲屎"} func={"clearFeces"} />
          </div>}
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"治疗"} func={"cure"} />
          </div>}
          <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"检查"} func={"examCat"} />
          </div>
          {!isDead && <div className="flex flex-col justify-center items-center"> 
            <FeedModal tokenId={tokenId}/>
          </div>}
          <div className="flex flex-col justify-center items-center"> 
            <Button tokenId={tokenId} name={"埋葬"} func={"buryCat"} />
          </div>
        </div>
      </div>
    </div>
    :
    <Loader />
  )
}

export default Assets;