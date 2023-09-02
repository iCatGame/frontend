import { useContractRead } from "wagmi";
import { Avatar, Card } from "antd";
import icatAbi from "@/lib/abi/catAbi";
import { useEffect } from "react";
import CatCard from "./CatCard";

const { Meta } = Card;

const CatCards = ({ address }) => {

  const { data, isError, isSuccess, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: icatAbi,
    functionName: 'getOwnedTokenId',
    args: [address]
  })

  const generatedElements = !!data &&
    (
      data?.[0].length == 0 ?
      <div>
      <p>还没有iCat哦，快去铸造一个吧！</p>
    </div>
    :
      data[0].map(tokenId => (
        <CatCard key={tokenId} tokenId={tokenId} />
      ))
    );

  useEffect(() => {
    // console.log(data, isSuccess)
  }, [data, isSuccess])

  return (
    // Todo: 把Card用Link包裹
    <div className='flex flex-row flex-wrap gap-4 pt-8 pb-20'>
      {generatedElements}
    </div>
  )
}

export default CatCards;