import BigCard from "./BigCard";

export default function DoubleCardSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-20 md:mt-16 lg:mt-20">
      <BigCard title="Investimentos" subtitle="Tesouro Direto" info="Renda Fixa">
        <p className="text-[#00b37e] text-lg">
          {/* R$ {investment.amount.toFixed(2).replace(".", ",")} */} R$ 5.000,00
        </p>
      </BigCard>
      
      <BigCard title="Metas" subtitle="Casamento" info="">
        <div className="flex justify-between text-sm">
          <span className="text-[#c4c4cc] text-lg">
            {/* R$ {goal.currentAmount.toFixed(2).replace(".", ",")} */} R$ 2.500,00
          </span>
          <span className="text-[#c4c4cc] text-lg">
            {/* R$ {goal.targetAmount.toFixed(2).replace(".", ",")} */} R$ 10.000,00
          </span>
        </div>
        <div className="w-full bg-[#121214] rounded-full h-2">
          <div className="bg-[#00b37e] h-2 rounded-full transition-all"
              //style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-[#00b37e] text-sm mt-2">
          {/* {progress.toFixed(0)}% concluído */} 25% concluído
        </p>
      </BigCard>
    </section>
  );
}