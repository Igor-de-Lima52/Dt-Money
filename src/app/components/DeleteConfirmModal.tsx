"use client";

import { LuTriangle, LuLoader, LuX } from "react-icons/lu";
import { useState } from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar exclusão",
  message = "Tem certeza? Esta ação não pode ser desfeita.",
}: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#202024] rounded-[6px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.8)] w-full max-w-[420px] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <LuTriangle className="w-6 h-6 text-[#f75a68] shrink-0" />
            <h2 className="font-bold text-[#e1e1e6] text-xl">{title}</h2>
          </div>
          <button onClick={onClose} className="text-[#7c7c8a] hover:text-[#c4c4cc] transition-colors">
            <LuX className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[#7c7c8a] mb-8">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 bg-[#29292e] hover:bg-[#323238] transition-colors text-[#c4c4cc] font-bold py-3 rounded-[6px]"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 bg-[#f75a68] hover:bg-[#e74856] transition-colors text-white font-bold py-3 rounded-[6px] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <><LuLoader className="w-5 h-5 animate-spin" /> Excluindo...</>
            ) : (
              "Excluir"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
