"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuLogOut, LuUser } from "react-icons/lu";

interface HeaderProps {
  onNewTransaction: () => void;
}

// { onNewTransaction }: HeaderProps

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="w-full px-6 py-10 z-10 md:z-0 fixed md:relative md:px-12 lg:px-30 md:pt-10 md:pb-30 bg-[var(--background)] flex items-center justify-between">
      <Image src="/logo.svg" alt="Logo" width={200} height={50} loading="eager" className="w-auto h-8 md:h-auto" />
      <div className="flex md:items-center gap-4">
        <button
          // onClick={onNewTransaction}
          className="bg-[#00875f] hover:bg-[#015f43] transition-colors content-stretch flex items-center justify-center overflow-clip px-3 py-2 md:px-5 md:py-3 rounded-[6px] shrink-0"
        >
          <p className="font-bold leading-[1.6] text-sm md:text-base text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
            Nova transação
          </p>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="bg-[#323238] hover:bg-[#29292e] transition-colors p-3 rounded-[6px] flex items-center justify-center"
          >
            <LuUser className="w-7 h-7 text-[#00b37e]" />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 bg-[#29292e] rounded-[6px] shadow-lg min-w-[160px] z-50">
              <Link href="/signin">
                <button className="w-full p-4 py-3 text-left text-[#c4c4cc] hover:bg-[#323238] flex items-center gap-2 font-['Roboto:Regular',sans-serif] hover:rounded-[6px]">
                  <LuLogOut className="w-7 h-7" />
                  Sair
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



