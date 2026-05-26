import { LuSearch, LuChevronDown } from "react-icons/lu";

interface TransactionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: "all" | "income" | "expense";
  setFilterType: (value: "all" | "income" | "expense") => void;
  sortOrder: "recent" | "oldest";
  setSortOrder: (value: "recent" | "oldest") => void;
}

export default function TransactionsFilters({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  sortOrder,
  setSortOrder,
}: TransactionsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="w-full md:w-[50%] xl:w-[80%] bg-[#121214] border border-[#323238] rounded-lg relative flex items-center gap-3">
        <LuSearch className="w-5 h-5 text-[#7c7c8a] absolute left-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busque uma transação"
          className="w-full bg-transparent border-0 py-3 pl-10 pr-3 text-[#e1e1e6] placeholder:text-[#7c7c8a] focus:outline-none"
        />
      </div>
      <div className="w-full md:w-[50%] flex gap-2">
        <div className="relative w-full flex items-center">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
            className="cursor-pointer bg-[#29292e] text-[#c4c4cc] w-full px-4 pr-10 py-3 rounded-lg border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
          >
            <option value="all">Todos</option>
            <option value="income">Entradas</option>
            <option value="expense">Saídas</option>
          </select>
          <LuChevronDown className="absolute right-4 w-4 h-4 text-[#7c7c8a] pointer-events-none" />
        </div>

        <div className="relative w-full flex items-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "recent" | "oldest")}
            className="cursor-pointer bg-[#29292e] text-[#c4c4cc] w-full px-4 pr-10 py-3 rounded-lg border-0 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
          >
            <option value="recent">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
          </select>
          <LuChevronDown className="absolute right-4 w-4 h-4 text-[#7c7c8a] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}