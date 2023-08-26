import { Avatar, Card } from "antd"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
import { ContractFunctionExecutionError } from "viem";
import iCatAbi from "@/lib/abi/catAbi.json";
import { useEffect, useState } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast, Toaster } from "react-hot-toast";

export const OrnamentCard = ({ style }) => {

  const { address } = useAccount();
  const [amount, setAmount] = useState(undefined);

  const ornament = {
    'hat': 0,
    'scarf': 1,
    'clothes': 2
  }

  const ornamentTrans = {
    'hat': '帽子',
    'scarf': '围巾',
    'clothes': '衣服'
  }

  const { data, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'ornamentBalance',
    args: [address, ornament[style]]
  })

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'buyOrnament',
    args: [ornament[style], amount]
  })
  const { data: tx, isLoading, isSuccess, write } = useContractWrite(config);
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    // console.log(data, error)
    if (isSuccess) {
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `购买${ornamentTrans[style]}`
      })
    }
    if (error instanceof ContractFunctionExecutionError) {
      // console.log('message:', error.metaMessages)
      if (error.metaMessages[0] == "Error: creditNotEnough()") {
        toast.error("积分不足！");
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
              {isLoading ? `购买中...` : isSuccess ? `购买成功！` : `购买${ornamentTrans[style]}`}
            </button>
          </div>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={`${ornamentTrans[style]}`}
          description={`余额：${data}个`}
        />
      </Card>
    </div>
  )
}