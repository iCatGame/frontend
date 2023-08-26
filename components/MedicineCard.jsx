import { Avatar, Card } from "antd"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
import { ContractFunctionExecutionError } from "viem";
import iCatAbi from "@/lib/abi/catAbi.json";
import { useEffect, useState } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast, Toaster } from "react-hot-toast";

export const MedicineCard = () => {

  const { address } = useAccount();
  const [amount, setAmount] = useState(undefined);

  const { data, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'medicine',
    args: [address]
  })

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'buyMedicine',
    args: [amount]
  })
  const { data: tx, isLoading, isSuccess, write } = useContractWrite(config);
  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    // console.log(data, error)
    if (isSuccess) {
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `购买药品`
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
          <img alt={`药品`} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"></img>
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
              {isLoading ? `购买中...` : isSuccess ? `购买成功！` : `购买药品`}
            </button>
          </div>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={`药品`}
          description={`余额：${data}个`}
        />
      </Card>
    </div>
  )
}