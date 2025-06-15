import { useState } from "react";

export default function useTemporaryModal(timeout = 1000) {
  const [modal, setModal] = useState({ open: false, message: "" });

  const showModal = (message) => {
    setModal({ open: true, message });
    setTimeout(() => setModal({ open: false, message: "" }), timeout);
  };

  const Modal = () =>
    modal.open ? (
      <div className="fixed inset-0 flex items-center justify-center z-[5]">
        <div className="bg-red-400 text-black px-8 py-4 rounded-lg shadow-lg text-lg font-semibold">
          {modal.message}
        </div>
      </div>
    ) : null;

  return { showModal, Modal };
}