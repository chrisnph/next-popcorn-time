import { Dispatch, ReactNode, SetStateAction } from "react";

declare namespace TailwindTypes {
  export interface ModalProps {
    showModal?: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    title?: string;
    footer?: ReactNode;
    children: ReactNode;
  }
}

export default TailwindTypes;
