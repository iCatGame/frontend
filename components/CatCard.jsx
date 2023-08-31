import { useContractReads } from "wagmi";
import iCatAbi from "@/lib/abi/catAbi";
import { useEffect } from "react";
import Link from "next/link";
import { Avatar, Card } from "antd";

const CatCard = ({ tokenId }) => {

  const iCatCA = {
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi
  };

  const { data, isSuccess, isLoading, isError } = useContractReads({
    contracts: [
      {
        ...iCatCA,
        functionName: 'detail',
        args: [tokenId]
      },
      {
        ...iCatCA,
        functionName: 'tokenURI',
        args: [tokenId]
      }
    ]
  });

  const stage = {
    0: "幼生期",
    1: "成长期",
    2: "成熟期"
  }

  useEffect(() => {
    console.log(data); // eslint-disable-line no-console
  }, [data, isSuccess])

  return (
    <Link href={`/asset/${tokenId.toString()}`} key={tokenId}>
      <Card
        className='w-72 hover:shadow-lg cursor-pointer'
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        loading={!isSuccess}
      >
        <Card.Meta
        avatar={<Avatar />}
          title={`iCat #${tokenId} ${!!data ? data[0]?.result[0] : 'unknown'}`}
          description={stage[data?.[0].result[3]]}
        />
      </Card>
    </Link>
  )
}

export default CatCard;