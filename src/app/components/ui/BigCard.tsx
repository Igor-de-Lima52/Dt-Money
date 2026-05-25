import { LuPencil, LuPlus, LuTarget, LuTrash2, LuTrendingUp } from "react-icons/lu";

interface BigCardProps {
  title: "Investimentos" | "Metas";
  subtitle: string;
  info: string;
  children?: React.ReactNode;
}

export default function BigCard({ title, subtitle, info, children }: BigCardProps) {
  return (
      <div className="bg-[#29292e] rounded-lg p-5 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {
              title === "Investimentos" ? (
                <LuTrendingUp className="w-5 h-5 text-[#00b37e]" />
              ) : (
                <LuTarget className="w-5 h-5 text-[#00b37e]" />
              )
            }
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[#e1e1e6] text-xl">
              {title}
            </h2>
          </div>
          <button
            // onClick={() => {
              // setSelectedInvestment(undefined);
              // setInvestmentModalOpen(true);
            // }}
            className="cursor-pointer bg-[#00875f] hover:bg-[#015f43] transition-colors p-2 rounded"
          >
            <LuPlus className="w-6 h-6 text-white" />
          </button>
        </div>
      {/* <div className="space-y-4"> */}
        {/* {investments.length === 0 ? ( */}
          {/* <p className="font-['Roboto:Regular',sans-serif] text-[#7c7c8a] text-center py-8"> */}
            {/* Nenhum investimento cadastrado */}
          {/* </p> */}
          {/* ) : ( */}
          {/* investments.map((investment) => ( */}
            <div className="bg-[#323238] rounded-lg p-4 lg:p-6">
              {/* {investment.image && (
                <img src={investment.image} alt={investment.name} className="w-full h-32 object-cover rounded mb-3" />
              )} */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-[#e1e1e6] text-xl">{subtitle}</h3>
                  <p className="text-[#c4c4cc] text-lg">{info}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    // onClick={() => handleEditInvestment(investment)}
                    className="cursor-pointer text-[#00b37e] hover:text-[#00875f] transition-colors"
                  >
                    <LuPencil className="w-6 h-6" />
                  </button>
                  <button
                    // onClick={() => openDeleteModal("investment", investment.id)}
                    className="cursor-pointer text-[#f75a68] hover:text-[#e74856] transition-colors"
                  >
                    <LuTrash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
                {children}
            </div>
            {/* )) */}
          {/* )} */}
      </div>
  );
}


{/* Goals */}
            // <div className="bg-[#29292e] rounded-lg p-5 lg:p-6">
            //   <div className="flex items-center justify-between mb-6">
            //     <div className="flex items-center gap-2">
            //       <LuTarget className="w-5 h-5 text-[#00b37e]" />
            //       <h2 className="font-bold text-[#e1e1e6] text-xl">
            //         Objetivos
            //       </h2>
            //     </div>
            //     <button
            //       // onClick={() => {
            //       //   setSelectedGoal(undefined);
            //       //   setGoalModalOpen(true);
            //       // }}
            //       className="cursor-pointer bg-[#00875f] hover:bg-[#015f43] transition-colors p-2 rounded"
            //     >
            //       <LuPlus className="w-6 h-6 text-white" />
            //     </button>
            //   </div>

              {/* <div className="space-y-4"> */}
                {/* {goals.length === 0 ? (
                  <p className="font-['Roboto:Regular',sans-serif] text-[#7c7c8a] text-center py-8">
                    Nenhum objetivo cadastrado
                  </p>
                ) : ( 
                  {/* goals.map((goal) => { */}
                    {/* const progress = (goal.currentAmount / goal.targetAmount) * 100; */}
                    {/* return ( */}
                      // <div className="bg-[#323238] rounded-lg p-4 lg:p-6">
                        {/* {goal.image && (
                          <img src={goal.image} alt={goal.name} className="w-full h-32 object-cover rounded mb-3" />
                        )} */}
                        // <div className="flex items-start justify-between mb-2">
                          // <div className="flex-1">
                            // <h3 className="font-bold text-[#e1e1e6] text-xl">Casamento</h3>
                            // <p className="text-[#c4c4cc] text-lg">
                              // {/* Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")} */} Prazo: 30/05/2026
                            // </p>
                          // </div>
                          // <div className="flex gap-2">
                            // <button
                              // onClick={() => handleEditGoal(goal)}
                              // className="cursor-pointer text-[#00b37e] hover:text-[#00875f] transition-colors"
                            // >
                              // <LuPencil className="w-6 h-6" />
                            // </button>
                            // <button
                              // onClick={() => openDeleteModal("goal", goal.id)}
                              // className="cursor-pointer text-[#f75a68] hover:text-[#e74856] transition-colors"
                            // >
                              // <LuTrash2 className="w-6 h-6" />
                            // </button>
                          // </div>
                        // </div>
                        // <div className="space-y-2">
                      // </div>
                    // {/* ); */}
                  // {/* }) */}
                // {/* )} */}
              // {/* </div> */}
            // </div>*/}