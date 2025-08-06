import { MouseEvent } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/70"
      onClick={handleOverlayClick}
    >
      <div className="bg-primary-900 text-primary-50 rounded-xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-primary-800">
        <h2 className="text-lg font-bold text-primary-50">{title}</h2>
        <p className="text-sm text-primary-300">{description}</p>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-primary-200 hover:text-primary-100 hover:bg-primary-800 rounded-md transition-colors"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-primary-950 bg-accent-500 hover:bg-accent-600 rounded-md transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
