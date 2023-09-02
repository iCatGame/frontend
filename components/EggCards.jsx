import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Avatar, Card } from "antd";
import eggAbi from "@/lib/abi/eggAbi";
import { useEffect } from "react";
import EggCard from "./EggCard";

const { Meta } = Card;

const EggCards = ({ address }) => {

  const { data, isError, isSuccess, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_EGG_CONTRACT_ADDRESS,
    abi: eggAbi,
    functionName: 'getOwnedTokenId',
    args: [address]
  })

  const generatedElements = !!data &&
    (
      data?.[0].length == 0 ?
      <div className="pb-20">
      <p>还没有iCat哦，快去铸造一个吧！</p>
    </div>
    :
      data[0].map(tokenId => (
        <EggCard key={tokenId} tokenId={tokenId} />
      ))
    );

  useEffect(() => {
    // console.log(data)
  }, [data, isSuccess])
  
  return (
    <div className='flex flex-row flex-wrap gap-4 pt-8 pb-20'>
      {generatedElements}
    </div>
  )
}

export default EggCards;