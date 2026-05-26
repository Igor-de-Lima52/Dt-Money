import { X, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Goal } from "../types";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, "id"> & { id?: string }) => void;
  goal?: Goal;
}

export default function GoalModal({ isOpen, onClose, onSave, goal }: GoalModalProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setTargetAmount(goal.targetAmount.toString());
      setCurrentAmount(goal.currentAmount.toString());
      setDeadline(goal.deadline);
      setImage(goal.image || "");
    } else {
      setName("");
      setTargetAmount("");
      setCurrentAmount("0");
      setDeadline("");
      setImage("");
    }
  }, [goal, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: goal?.id,
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      deadline,
      image,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#202024] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] w-full max-w-[535px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-12">
          <div className="flex items-start justify-between mb-8">
            <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[#e1e1e6] text-2xl" style={{ fontVariationSettings: "'wdth' 100" }}>
              {goal ? "Editar objetivo" : "Novo objetivo"}
            </h2>
            <button onClick={onClose} className="text-[#7c7c8a] hover:text-[#c4c4cc] transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do objetivo"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <input
              type="number"
              step="0.01"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Valor total do objetivo"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <input
              type="number"
              step="0.01"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              placeholder="Valor já economizado"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Data limite"
              required
              className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-4 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
            />

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#121214] border-2 border-dashed border-[#323238] hover:border-[#00b37e] transition-colors rounded-[6px] px-4 py-8 flex flex-col items-center justify-center gap-2"
              >
                {image ? (
                  <img src={image} alt="Preview" className="max-h-32 rounded" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-[#7c7c8a]" />
                    <span className="font-['Roboto:Regular',sans-serif] text-[#7c7c8a] text-sm">
                      Clique para adicionar uma imagem (opcional)
                    </span>
                  </>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-['Roboto:Bold',sans-serif] font-bold py-4 rounded-[6px] mt-4"
            >
              {goal ? "Salvar alterações" : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
