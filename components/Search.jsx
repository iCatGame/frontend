import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

export const Search = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="bg-gray-200 h-[40px] flex item-center rounded-full">
        <div className="flex flex-row items-center pl-3 space-x-3 w-full">
          <SearchOutlined />
          <input type='text' placeholder="查看其他人的iCat" className="bg-gray-200 rounded-full focus:outline-none w-full" value={value} onChange={a => {setValue(a.target.value)}}/>
        </div>
      </div> 
      <Link href={`/user/${value}`}>
        <button disabled={value == ""} className={`rounded-full text-neutral-100 h-[40px] font-[500] transition tracking-wide w-[150px] outline-none bg-blue-600 hover:bg-blue-700`}>
          前往
        </button>
      </Link>
    </div>
  );
};
  