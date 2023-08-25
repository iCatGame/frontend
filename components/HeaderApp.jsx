import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from './Search';

const HeaderApp = () => {

  return (
    <nav className='flex items-center justify-start space-x-8 bg-slate-50 container drop-shadow-xl'>
      <Link href={"/"} className="flex items-center font-medium text-white text-lg">
        <Image
          src={`/images/qr.png`}
          width={64}
          height={64}
          alt=""
          priority
          className="relative w-16 h-16 mr-auto md:mr-0 flex-shrink-0 !important"
        />
      </Link>
      <ul className='hidden sm:flex sm:items-center space-x-5'>
        <li>
          <Link href={"/profile"} className='hover:text-black text-gray-400'>
            个人主页
          </Link>
        </li>
        <li>
          <Link href="/mint" className='hover:text-black text-gray-400'>
            铸造
          </Link>
        </li>
      </ul>
      <div className='flex justify-center items-center min-w-[50%] max-w-2xl w-full'>
        <Search />
      </div>
    </nav>
  );
};
export default HeaderApp;