import { LuPencil, LuTrash2 } from "react-icons/lu";

interface TransactionContainerProps {
  id: string;
  children?: React.ReactNode;
}

export function TransactionContainer({ id, children }: TransactionContainerProps) {
  return (
    <div key={id} className="w-[99%] cursor-pointer bg-[#29292e] rounded-lg px-4 md:px-6 lg:px8 py-3 md:py-5 group hover:bg-[#323238] transition-colors relative flex flex-col gap-1 md:flex-row md:items-center justify-between">
      {children}
      <div className="absolute md:relative bottom-3 md:top-0 right-2 md:right-0 flex gap-1 lg:gap-2 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
        <button
          // onClick={() => handleEditTransaction(transaction)}
          className="cursor-pointer text-[#00b37e] hover:text-[#00875f] transition-colors p-2"
        >
          <LuPencil className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          // onClick={() => openDeleteModal("transaction", transaction.id)}
          className="cursor-pointer text-[#f75a68] hover:text-[#e74856] transition-colors p-2"
        >
          <LuTrash2 className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
}

interface TransactionTitleProps {
  title: string;
}

export function TransactionTitle({ title }: TransactionTitleProps) {
  return (
    <p className="text-[#c4c4cc] w-[50%] md:w-[25%] text-lg xl:text-xl">
      {title}
    </p>
  );
}

interface TransactionValueProps {
  amount: number;
  type: "income" | "expense";
}

export function TransactionValue({ amount, type }: TransactionValueProps) {
  return (
    <p className={`w-[50%] md:w-[20%] lg:w-[15%] md:text-end xl:text-xl ${type === "income" ? "text-[#00b37e]" : "text-[#f75a68]"}`}>
      {type === "expense" && "- "}R$ {amount.toFixed(2).replace(".", ",")}
    </p>
  );
}

interface TransactionCategoryProps {
  category: string;
}

export function TransactionCategory({ category }: TransactionCategoryProps) {
  return (
    <p className="'text-[#c4c4cc] w-[20%] xl:w-[15%] text-center xl:text-xl">
      {category}
    </p>
  );
}

interface TransactionDateProps {
  date: string;
}

export function TransactionDate({ date }: TransactionDateProps) {
  return (
    <p className="text-[#c4c4cc] w-[50%] md:w-[15%] xl:w-[10%] text-end md:text-center xl:text-xl absolute top-4 right-4 md:relative md:top-0 md:right-0">
      {date}
    </p>
  );
}                 