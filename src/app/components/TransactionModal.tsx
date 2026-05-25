import { useState, useEffect } from "react";
import { Transaction, TransactionType } from "../types";
import { LuX } from "react-icons/lu";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

interface TransactionModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  // onSave: (transaction: Omit<Transaction, "id"> & { id?: string }) => void;
  // transaction?: Transaction;
}

export default function TransactionModal({  }: TransactionModalProps) {
  // const [description, setDescription] = useState("");
  // const [amount, setAmount] = useState("");
  // const [category, setCategory] = useState("");
  // const [type, setType] = useState<TransactionType>("income");

  // useEffect(() => {
  //   if (transaction) {
  //     setDescription(transaction.description);
  //     setAmount(transaction.amount.toString());
  //     setCategory(transaction.category);
  //     setType(transaction.type);
  //   } else {
  //     setDescription("");
  //     setAmount("");
  //     setCategory("");
  //     setType("income");
  //   }
  // }, [transaction, isOpen]);

  // const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   onSave({
  //     id: transaction?.id,
  //     description,
  //     amount: parseFloat(amount),
  //     category,
  //     type,
  //     date: transaction?.date || new Date().toLocaleDateString("pt-BR"),
  //   });
  //   onClose();
  // };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#202024] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] w-full max-w-[535px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-12">
          <div className="flex items-start justify-between mb-8">
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[#e1e1e6] text-2xl" style={{ fontVariationSettings: "'wdth' 100" }}>
              {/* {transaction ? "Editar transação" : "Nova transação"} */}
            </h2>
            <button //onClick={onClose} 
            className="text-[#7c7c8a] hover:text-[#c4c4cc] transition-colors">
              <LuX className="w-6 h-6" />
            </button>
          </div>

          <form //onSubmit={handleSubmit} 
          className="flex flex-col gap-4">
            <input
              type="text"
              //value={description}
              //onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <input
              type="number"
              step="0.01"
              //value={amount}
              //onChange={(e) => setAmount(e.target.value)}
              placeholder="Preço"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <input
              type="text"
              //value={category}
              //onChange={(e) => setCategory(e.target.value)}
              placeholder="Categoria"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                //onClick={() => setType("income")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[6px] transition-colors ${
                  type === "income"
                    ? "bg-[#00b37e] bg-opacity-10 border-2 border-[#00b37e]"
                    : "bg-[#29292e] border-2 border-transparent"
                }`}
              >
                <FiArrowUpCircle className="w-6 h-6 text-[#00b37e]" />
                <span className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc]">Entrada</span>
              </button>

              <button
                type="button"
                //onClick={() => setType("expense")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[6px] transition-colors ${
                  type === "expense"
                    ? "bg-[#f75a68] bg-opacity-10 border-2 border-[#f75a68]"
                    : "bg-[#29292e] border-2 border-transparent"
                }`}
              >
                <FiArrowDownCircle className="w-6 h-6 text-[#f75a68]" />
                <span className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc]">Saída</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-bold py-4 rounded-[6px] mt-4"
            >
              {/* {transaction ? "Salvar alterações" : "Cadastrar"} */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
