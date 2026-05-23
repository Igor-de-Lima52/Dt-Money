import { TransactionCategory, TransactionContainer, TransactionDate, TransactionTitle, TransactionValue } from "./TransactionLine";

export default function TransactionsList() {
  return (
    <div className="space-y-2 overflow-y-scroll h-50 md:h-80 xl:h-50 [w-[1800px]]:h-60 custom-scrollbar">
      {/* {filteredTransactions.length === 0 ? ( */}
        {/* <div className="bg-[#29292e] rounded-[6px] p-8 text-center">
          <p className="font-['Roboto:Regular',sans-serif] text-[#7c7c8a]">
            Nenhuma transação encontrada
          </p>
        </div> */}
        <TransactionContainer id={"akfnafkafamac"}>
          <TransactionTitle title="Salário" />
          <TransactionValue amount={5000} type="income" />
          <TransactionCategory category="Trabalho" />
          <TransactionDate date="01/01/2027" />
        </TransactionContainer>
        <TransactionContainer id={"akfnafkac"}>
          <TransactionTitle title="Salário" />
          <TransactionValue amount={1000} type="expense" />
          <TransactionCategory category="Aluguel" />
          <TransactionDate date="01/04/2027" />
        </TransactionContainer>
        <TransactionContainer id={"akfkafamac"}>
          <TransactionTitle title="Hamburguer" />
          <TransactionValue amount={15.99} type="expense" />
          <TransactionCategory category="Alimentação" />
          <TransactionDate date="01/01/2027" />
        </TransactionContainer>
        <TransactionContainer id={"kfnafkafamac"}>
          <TransactionTitle title="Salário" />
          <TransactionValue amount={5000} type="income" />
          <TransactionCategory category="Trabalho" />
          <TransactionDate date="01/09/2027" />
        </TransactionContainer>
    </div>
  );
}