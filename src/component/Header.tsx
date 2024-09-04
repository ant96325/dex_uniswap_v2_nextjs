// components/Header.tsx
import { SearchOutlined } from '@mui/icons-material';
import RainBowConnect from './RainBowConnect';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex w-full py-3 px-3 justify-between bg-[#131313] items-center h-15">
      <div className="mx-2.5 rounded-full items-center flex gap-x-7 text-primary font-bold text-[18px]">
          <div className="flex gap-x-1 text-[14px] items-center cursor-pointer" onClick={() => {window.location.href="/"}}>
              <img src="./img/logo.svg" className="h-[20px] bg-primary"/> 
              <span className="text-amber-500">MickySwap</span>
          </div>
          <div className="cursor-pointer" onClick={() => {window.location.href="liquidity"}}>Liquidity</div>
          <div>Swap</div>
      </div>
      <div className="rounded-full border-opacity-20 border border-gray-400 px-1 py-[4px] flex w-96 text-[14px] items-center">
          <div className="text-gray-400 px-1"><SearchOutlined fontSize="small"/></div>
          <input type="text" className="bg-transparent w-full font-bold focus:outline-none py-1 t ext-neutral-500 text-neutral-300" placeholder="Search tokens and NFT collections"/>
          <div className="bg-neutral-900 px-[6px] rounded-[5px] text-[12px] mr-1 text-neutral-500 font-bold">/</div>
      </div>
      <div className="flex items-center text-neutral-400 gap-x-5 shoudp.text-primary font-bold">
          <RainBowConnect />
      </div>
    </header>
  )
};

export default Header;