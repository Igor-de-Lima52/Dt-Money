import { FiArrowDownCircle, FiArrowUpCircle, FiDollarSign } from "react-icons/fi";

interface MoneyCardProps {
  title: "Entradas" | "Saídas" | "Total";
  amount: number;
}

export default function MoneyCard({ title, amount }: MoneyCardProps) {
  return (
    <div className={`${title === "Total" ? "bg-[#00b37e]" : "bg-[#29292e]"} rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg lg:text-xl text-[#c4c4cc]">{title}</span>
        {
          title === "Entradas" ? (
            <FiArrowUpCircle className="w-8 h-8 text-[#00b37e]" />
          ) : title === "Saídas" ? (
            <FiArrowDownCircle className="w-8 h-8 text-[#f75a68]" />
          ) : (
            <FiDollarSign className="w-8 h-8 text-white" />
          )
        }
      </div>
      <strong className="text-[#e1e1e6] md:text-2xl lg:text-3xl block">
        {/* R$ {totalIncome.toFixed(2).replace(".", ",")} */}R$ {amount.toFixed(2).replace(".", ",")}
      </strong>
    </div>
  );
}