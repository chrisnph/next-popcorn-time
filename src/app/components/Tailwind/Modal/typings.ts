import { ReactNode } from "react";

declare namespace TailwindTypes {
  export interface ModalProps {
    showModal?: boolean;
    title?: string;
    footer?: ReactNode;
    children: ReactNode;
  }
}

export default TailwindTypes;
