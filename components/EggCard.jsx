import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { Avatar, Card } from "antd";
import eggAbi from "@/lib/abi/eggAbi";

const { Meta } = Card;

const EggCard = ({ tokenId }) => {

  const { data: metadata, isSuccess: isReadSuccess } = useContractRead({
    address: process.env.NEXT_PUBLIC_EGG_CONTRACT_ADDRESS,
    abi: eggAbi,
    functionName: 'tokenURI',
    args: [tokenId]
  })
    
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
    // console.log(metadata, typeof(metadata))
  }, [data, isSuccess, metadata, isReadSuccess])

  return (
    <Card
    className='w-72 hover:shadow-lg'
    cover={
    <img
      alt="example"
      src={metadata == `https://${tokenId}` ? "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" : metadata}
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
        title={`iCat Egg #${tokenId}`}
        description="孵化扣除10积分"
      />
    </Card>
  )
}

export default EggCard;