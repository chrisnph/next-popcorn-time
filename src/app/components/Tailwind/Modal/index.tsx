import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TailwindTypes from "./typings";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { type } from "os";
import { cardAnimation } from "@/app/components/Movies/animations";
import { dropIn } from "./animations";

const Modal = ({
  showModal,
  setShowModal,
  title,
  children,
}: TailwindTypes.ModalProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative min-w-[90vw] min-h-[90vh] my-6 mx-auto max-w-3xl overflow-y-auto">
              <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="modal-container rounded-lg shadow-lg relative flex flex-col bg-gray-900 outline-none focus:outline-none p-0 overflow-y-auto overflow-x-hidden"
              >
                <button
                  className="absolute top-1 right-3 text-[#B6FFF5] hover:text-[#5f9d95] text-[2rem]"
                  onClick={() => setShowModal(false)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>

                {title && (
                  <div>
                    <span className="text-[#537178] text-[20px]">{title}</span>
                  </div>
                )}

                {children}
              </motion.div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default Modal;
