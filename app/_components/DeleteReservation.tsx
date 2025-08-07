"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import ConfirmModal from "./ConfirmModal";
import SpinnerMini from "./MiniSpinner";

interface DeleteReservationProps {
  bookingId: number;
  onDelete: (bookingId: number) => void;
}

function DeleteReservation({ bookingId, onDelete }: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeleteConfirm() {
    startTransition(() => {
      setIsModalOpen(false);
      onDelete(bookingId);
    });
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      >
        {!isPending ? (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
          </>
        ) : (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        )}
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete reservation?"
        description="This action cannot be undone. Are you sure you want to cancel this reservation?"
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DeleteReservation;
