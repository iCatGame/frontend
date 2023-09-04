"use client"

import Assets from "@/components/Assets";
import FooterApp from "@/components/FooterApp";
import HeaderApp from "@/components/HeaderApp";
import { useContractRead } from "wagmi";
import icatAbi from "@/lib/abi/catAbi";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { NotFound } from "@/components/NotFound";


const AssetPage = ({ params }) => {
  // Todo: 没有tokenId的情况
  // 搞完了

  const [isValidTokenId, setIsValidTokenId] = useState(true);

  const { data, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: icatAbi,
    functionName: 'ownerOf',
    args: [params.tokenId]
  })

  useEffect(() => {
    if (data == undefined || data == '0x0000000000000000000000000000000000000000') {
      setIsValidTokenId(false);
    }
    // console.log('asset available?', isValidTokenId)
  }, [isLoading, isValidTokenId])

  return (
    <div>
        <HeaderApp />
        {
          isLoading ?
          <Loader />
          :
          (
            !isValidTokenId ?
            <NotFound />
            :
            <Assets tokenId={params.tokenId} />
          )
        }
        <FooterApp />
    </div>
  )
}

export default AssetPage;