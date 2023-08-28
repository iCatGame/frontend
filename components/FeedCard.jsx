import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Avatar, Card } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ContractFunctionExecutionError } from "viem";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import iCatAbi from "@/lib/abi/catAbi.json";

export const FeedCard = ({ tokenId, style }) => {
  
  const { address } = useAccount();
  const [amount, setAmount] = useState(undefined);

  const food = {
    'leftover': 0,
    'fishchip': 1,
    'tin': 2
  }

  const foodTrans = {
    'leftover': '剩饭',
    'fishchip': '小鱼干',
    'tin': '鱼罐头'
  }

  const { data, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'foodBalance',
    args: [address, food[style]]
  })

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'feedCat',
    args: [tokenId, food[style], amount]
  })
  const { data: tx, isLoading, isSuccess, write } = useContractWrite(config);
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    // console.log(data, error)
    if (isSuccess) {
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `购买${foodTrans[style]}`
      })
    }
    if (error instanceof ContractFunctionExecutionError) {
      // console.log('message:', error.metaMessages)
      if (error.metaMessages[0] == "Error: foodNotEnough()") {
        toast.error("该种食物不足！");
      }
    }
  }, [data, isError, isSuccess, error])

  return (
    <div className="hover:drop-shadow-lg">
      <Card
        cover={
          <img alt={`${style}`} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"></img>
        }
        actions={[
          <div className="flex items-center space-x-2 justify-center">
            <input 
              className="bg-gray-100 rounded-full h-[30px] pl-3 w-[130px]"
              type="number"
              placeholder="请输入数量"
              value={amount}
              onChange={a => {setAmount(a.target.value)}}
            />
            <button disabled={!write} onClick={() => write?.()} className={`rounded-xl text-neutral-100 font-[100] transition tracking-wide w-[90px] h-[30px] outline-none ${isLoading ? "bg-emerald-500" : isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {isLoading ? `喂食中...` : isSuccess ? `喂食成功！` : `投喂${foodTrans[style]}`}
            </button>
          </div>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={`${foodTrans[style]}`}
          description={`余额：${data}个`}
        />
      </Card>
    </div>
  )
}