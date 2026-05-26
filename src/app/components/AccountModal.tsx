"use client";

import { useEffect, useState, useRef } from "react";
import { LuX, LuBanknote, LuLoader, LuSearch, LuChevronDown } from "react-icons/lu";
import { useAuth } from "../contexts/auth-context";
import { useAccount } from "../contexts/account-context";
import { getBancos, Banco } from "../services/banco";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { user } = useAuth();
  const { addConta } = useAccount();

  const [nome, setNome] = useState("");
  const [bancoId, setBancoId] = useState("");
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [loadingBancos, setLoadingBancos] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoadingBancos(true);
    getBancos()
      .then((data) => {
        setBancos(data);
        if (data.length > 0) setBancoId(data[0].id);
      })
      .catch(() => setError("Não foi possível carregar os bancos."))
      .finally(() => setLoadingBancos(false));
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredBancos = bancos.filter((banco) => {
    const term = searchQuery.toLowerCase();
    const nomeMatches = banco.nome ? banco.nome.toLowerCase().includes(term) : false;
    const codigoMatches = banco.codigo !== undefined && banco.codigo !== null
      ? String(banco.codigo).toLowerCase().includes(term)
      : false;
    return nomeMatches || codigoMatches;
  });

  const sortedFilteredBancos = [...filteredBancos].sort((a, b) => {
    const codeA = a.codigo ?? Infinity;
    const codeB = b.codigo ?? Infinity;
    return codeA - codeB;
  });

  const selectedBanco = bancos.find((b) => b.id === bancoId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !bancoId) return;
    setError("");
    setSaving(true);
    try {
      await addConta({ nome, usuarioId: user.id, bancoId });
      setNome("");
      onClose();
    } catch {
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#202024] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] w-full max-w-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <LuBanknote className="w-6 h-6 text-[#00b37e]" />
              <div>
                <h2 className="font-bold text-[#e1e1e6] text-xl">
                  Nova conta bancária
                </h2>
                <p className="text-[#7c7c8a] text-sm mt-1">
                  Cadastre uma conta para começar a registrar suas transações
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#7c7c8a] hover:text-[#c4c4cc] transition-colors ml-4 shrink-0">
              <LuX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#c4c4cc] text-sm">Nome da conta</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Conta corrente, Poupança..."
                required
                className="w-full bg-[#121214] rounded-[6px] px-4 py-4 text-[#e1e1e6] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
              />
            </div>

            <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
              <label className="text-[#c4c4cc] text-sm">Banco</label>
              {loadingBancos ? (
                <div className="flex items-center gap-2 text-[#7c7c8a] py-3">
                  <LuLoader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Carregando bancos...</span>
                </div>
              ) : (
                <>
                  {/* Dropdown Search Trigger */}
                  <div className="relative flex items-center">
                    {isOpenDropdown ? (
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={selectedBanco ? `${selectedBanco.codigo} — ${selectedBanco.nome}` : "Digite o código ou nome do banco..."}
                        autoFocus
                        className="w-full bg-[#121214] rounded-[6px] px-4 py-4 pr-14 text-[#e1e1e6] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e] border border-transparent transition-all"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsOpenDropdown(true)}
                        className="w-full bg-[#121214] rounded-[6px] px-4 py-4 pr-14 text-[#e1e1e6] text-left border border-transparent focus:outline-none focus:ring-2 focus:ring-[#00b37e] transition-all cursor-pointer"
                      >
                        {selectedBanco ? `${selectedBanco.codigo} — ${selectedBanco.nome}` : "Selecione um banco..."}
                      </button>
                    )}
                    <LuChevronDown
                      onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                      className={`absolute right-6 w-5 h-5 text-[#7c7c8a] transition-transform cursor-pointer ${
                        isOpenDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown List */}
                  {isOpenDropdown && (
                    <div className="absolute left-0 right-0 top-[105%] bg-[#202024] border border-[#323238] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] z-50 overflow-hidden flex flex-col">
                      {/* Options List */}
                      <div className="max-h-[200px] overflow-y-auto">
                        {sortedFilteredBancos.length === 0 ? (
                          <div className="p-4 text-[#7c7c8a] text-sm text-center">
                            Nenhum banco encontrado.
                          </div>
                        ) : (
                          sortedFilteredBancos.map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => {
                                setBancoId(b.id);
                                setIsOpenDropdown(false);
                                setSearchQuery("");
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                                b.id === bancoId
                                  ? "bg-[#29292e] text-[#00b37e] font-semibold"
                                  : "text-[#c4c4cc] hover:bg-[#29292e] hover:text-[#e1e1e6]"
                              }`}
                            >
                              <span>{b.codigo} — {b.nome}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {error && (
              <p className="text-[#f75a68] text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={saving || loadingBancos}
              className="w-full bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-bold py-4 rounded-[6px] mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <LuLoader className="w-5 h-5 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
