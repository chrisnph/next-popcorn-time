import TailwindTypes from "./typings";

const Modal = ({ showModal, title, children }: TailwindTypes.ModalProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="modal-container rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-[24px] min-w-[296px] min-h-[193px]">
                {title && (
                  <div>
                    <span className="text-[#537178] text-[20px]">{title}</span>
                  </div>
                )}

                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default Modal;
