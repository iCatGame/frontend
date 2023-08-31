import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite,  } from "wagmi"
import iCatAbi from "@/lib/abi/catAbi.json";
import { useEffect } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useSelector } from "react-redux";

export const Checkin = () => {
  const address = useSelector(state => state.address.address);

  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'credit',
    args: [address]
  })

  const { config, isError } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ICAT_CONTRACT_ADDRESS,
    abi: iCatAbi,
    functionName: 'checkIn',
    args:[]
  });
  const { data: tx, isSuccess, write } = useContractWrite({ config });

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: tx?.hash || "",
        description: `每日签到`
      })
    }
    console.log('address:', address, isError, isSuccess)
  }, [data, tx, address, isError, isSuccess])
  return (
    <div className="pr-[-50]">
      {
        isSuccess
        ?
        <button disabled={!isSuccess} className={`rounded-full text-black h-[40px] font-[500] transition tracking-wide w-[150px] outline-none bg-slate-100 hover:bg-slate-200 drop-shadow-lg`} onClick={() => write?.()}>
          签到
        </button>
        :
        <p className={`rounded-[12px] text-black h-[35px] font-[600] transition tracking-wide w-[150px] outline-none bg-write hover:scale-110 bg-slate-50 shadow-lg flex justify-center items-center`}>
          积分：{String(data)}
        </p>
      }
    </div>
  )
}