"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuLogOut, LuUser, LuChevronDown, LuPlus } from "react-icons/lu";
import { useAuth } from "../contexts/auth-context";
import { useAccount } from "../contexts/account-context";
import AccountModal from "./AccountModal";

interface HeaderProps {
  onNewTransaction: () => void;
}

export default function Header({ onNewTransaction }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { contas, contaAtiva, setContaAtiva } = useAccount();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showContaMenu, setShowContaMenu] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  return (
    <>
      <header className="w-full px-6 pt-8 pb-24 relative md:px-12 lg:px-30 md:pt-10 md:pb-30 bg-[#121214] flex items-center justify-between gap-4">
        <Image src="/logo.svg" alt="Logo" width={200} height={50} loading="eager" className="w-auto h-8 md:h-auto shrink-0" />

        {/* Account selector */}
        {contas.length > 0 && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowContaMenu((v) => !v)}
              className="cursor-pointer flex items-center gap-2 bg-[#29292e] hover:bg-[#323238] transition-colors px-4 py-2 rounded-lg text-[#c4c4cc] text-sm"
            >
              <span className="max-w-[160px] truncate">
                {contaAtiva ? `${contaAtiva.banco.nome} — ${contaAtiva.nome}` : "Selecionar conta"}
              </span>
              <LuChevronDown className="w-4 h-4 shrink-0" />
            </button>

            {showContaMenu && (
              <div className="absolute left-0 top-full mt-2 bg-[#29292e] rounded-lg shadow-lg min-w-[220px] z-50">
                {contas.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setContaAtiva(c); setShowContaMenu(false); }}
                    className={`cursor-pointer w-full text-left px-4 py-3 text-sm hover:bg-[#323238] transition-colors first:rounded-t-lg ${
                      contaAtiva?.id === c.id ? "text-[#00b37e]" : "text-[#c4c4cc]"
                    }`}
                  >
                    <p className="font-medium">{c.nome}</p>
                    <p className="text-xs text-[#7c7c8a]">{c.banco.nome}</p>
                  </button>
                ))}
                <button
                  onClick={() => { setShowContaMenu(false); setAccountModalOpen(true); }}
                  className="cursor-pointer w-full text-left px-4 py-3 text-sm text-[#00b37e] hover:bg-[#323238] transition-colors rounded-b-lg flex items-center gap-2 border-t border-[#323238]"
                >
                  <LuPlus className="w-4 h-4" />
                  Nova conta
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onNewTransaction}
            disabled={!contaAtiva}
            title={!contaAtiva ? "Cadastre uma conta primeiro" : "Nova transação"}
            className="cursor-pointer bg-[#00875f] hover:bg-[#015f43] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center px-3 py-2 md:px-5 md:py-3 rounded-lg shrink-0"
          >
            <p className="font-bold text-sm md:text-base text-white">
              Nova transação
            </p>
          </button>

          {/* Profile menu */}
          <div className="relative z-50">
            <button
              onClick={() => setShowProfileMenu((v) => !v)}
              className="cursor-pointer bg-[#323238] hover:bg-[#29292e] transition-colors p-3 rounded-lg flex items-center justify-center"
            >
              <LuUser className="w-7 h-7 text-[#00b37e]" />
            </button>
            {showProfileMenu && (
              <div className="z-50 absolute right-0 top-full mt-2 bg-[#29292e] rounded-lg shadow-lg min-w-[200px]">
                {user && (
                  <div className="px-4 py-3 border-b border-[#323238]">
                    <p className="text-[#e1e1e6] font-medium text-sm truncate">{user.nome}</p>
                    <p className="text-[#7c7c8a] text-xs truncate">{user.email}</p>
                  </div>
                )}
                <Link href="/profile" onClick={() => setShowProfileMenu(false)}>
                  <button className="cursor-pointer w-full p-4 py-3 text-left text-[#c4c4cc] hover:bg-[#323238] flex items-center gap-2 hover:rounded-t-lg">
                    <LuUser className="w-5 h-5" />
                    Editar perfil
                  </button>
                </Link>
                <button
                  onClick={() => { setAccountModalOpen(true); setShowProfileMenu(false); }}
                  className="cursor-pointer w-full p-4 py-3 text-left text-[#c4c4cc] hover:bg-[#323238] flex items-center gap-2"
                >
                  <LuPlus className="w-5 h-5" />
                  Nova conta
                </button>
                <Link href="/signin" onClick={() => { signOut(); setShowProfileMenu(false); }}>
                  <button className="cursor-pointer w-full p-4 py-3 text-left text-[#c4c4cc] hover:bg-[#323238] flex items-center gap-2 hover:rounded-b-lg">
                    <LuLogOut className="w-5 h-5" />
                    Sair
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </>
  );
}
