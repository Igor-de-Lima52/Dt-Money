import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#202024] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] w-full max-w-[400px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f75a68] bg-opacity-10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#f75a68]" />
          </div>
          
          <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[#e1e1e6] text-xl" style={{ fontVariationSettings: "'wdth' 100" }}>
            {title}
          </h2>
          
          <p className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc] text-sm">
            {message}
          </p>

          <div className="flex gap-3 w-full mt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-[#323238] hover:bg-[#29292e] transition-colors text-[#c4c4cc] font-['Roboto:Bold',sans-serif] font-bold py-3 rounded-[6px]"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-[#f75a68] hover:bg-[#e74856] transition-colors text-white font-['Roboto:Bold',sans-serif] font-bold py-3 rounded-[6px]"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
