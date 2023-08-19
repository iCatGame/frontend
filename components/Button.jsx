import { useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi";
import iCatAbi from "@/lib/abi/catAbi.json";
import eggAbi from "@/lib/abi/eggAbi.json";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

const Button = ({ tokenId, name, func }) => {

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: func,
    args: [tokenId]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  // console.log(name, func)

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: `${name}`
      })
    }
  }, [data, isSuccess])

  return (
    <button disabled={!write} onClick={() => write?.()} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isLoading ? "bg-emerald-500" : isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
      {isLoading ? `${name}中...` : isSuccess ? `${name}成功！` : `${name}`}
    </button>
  )
}

export default Button;