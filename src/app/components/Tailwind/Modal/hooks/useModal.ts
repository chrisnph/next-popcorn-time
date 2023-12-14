import { useEffect, useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalElement = document.querySelector(".modal-container");
      if (modalElement && !modalElement.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return {
    showModal,
    setShowModal,
  };
};

export default useModal;
