import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import abi from "@/lib/abi/eggAbi";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const Mint = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_EGG_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'mint',
    args: []
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const addRecentTransaction = useAddRecentTransaction();

  // console.log('data:', data)

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "铸造Egg"
      })
    }
  }, [data, isSuccess])

  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto border rounded-lg p-4 bg-white drop-shadow-2xl">
            <h1 className="text-2xl font-semibold text-center pt-8">铸造iCat Egg</h1>
            <div className="relative overflow-hidden flex flex-col items-center justify-center gap-18 p-4 w-full">
              <img src="/images/qr.png" alt="" className="w-[80%] h-[80%] object-contain md:w-[300px] lg:w-[300px]" />
            </div>
            <div className="w-full space-x-5 flex items-center justify-center">
              <button disabled={!write} onClick={() => write?.()} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isLoading ? "bg-emerald-500" : isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isLoading ? "铸造中..." : isSuccess ? "铸造成功！" : "铸造"}
              </button>
              {isSuccess && 
                <Link href="/profile">
                  <button className="rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none bg-blue-600 hover:bg-blue-700">
                    个人主页
                  </button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint;