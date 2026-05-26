import { LuPencil, LuTrash2 } from "react-icons/lu";

interface TransactionContainerProps {
  id: string;
  onEdit: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}

export function TransactionContainer({ id, onEdit, onDelete, children }: TransactionContainerProps) {
  return (
    <div
      key={id}
      className="w-full bg-[#29292e] rounded-lg px-4 md:px-6 py-3 md:py-5 group hover:bg-[#323238] transition-colors relative flex flex-col gap-1 md:flex-row md:items-center justify-between"
    >
      {children}
      <div className="absolute md:relative bottom-3 md:top-0 right-2 md:right-0 flex gap-1 lg:gap-2 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="cursor-pointer text-[#00b37e] hover:text-[#00875f] transition-colors p-2"
        >
          <LuPencil className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={onDelete}
          className="cursor-pointer text-[#f75a68] hover:text-[#e74856] transition-colors p-2"
        >
          <LuTrash2 className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
}

export function TransactionTitle({ title }: { title: string }) {
  return (
    <p className="text-[#c4c4cc] w-[50%] md:w-[25%] text-lg xl:text-xl">
      {title}
    </p>
  );
}

export function TransactionValue({ amount, type }: { amount: number; type: "income" | "expense" }) {
  return (
    <p className={`w-[50%] md:w-[20%] lg:w-[15%] md:text-end xl:text-xl ${type === "income" ? "text-[#00b37e]" : "text-[#f75a68]"}`}>
      {type === "expense" && "- "}R$ {amount.toFixed(2).replace(".", ",")}
    </p>
  );
}

export function TransactionCategory({ category }: { category: string }) {
  return (
    <p className="text-[#c4c4cc] w-[20%] xl:w-[15%] text-center xl:text-xl">
      {category}
    </p>
  );
}

export function TransactionDate({ date }: { date: string }) {
  return (
    <p className="text-[#c4c4cc] w-[50%] md:w-[15%] xl:w-[10%] text-end md:text-center xl:text-xl absolute top-4 right-4 md:relative md:top-0 md:right-0">
      {date}
    </p>
  );
}