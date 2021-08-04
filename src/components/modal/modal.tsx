import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay";
import style from "./modal.module.css";
import { ReactNode } from "react";

type TModalProps = {
  header?: null | string;
  onDestroyModal: () => void;
  children: ReactNode;
};
const modalRoot = document.querySelector("#modal") as HTMLElement;

const Modal: React.FC<TModalProps> = ({ header = null, onDestroyModal, children }: TModalProps) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onDestroyModal={onDestroyModal} />
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.header_wrapper}>
          {header && <h2 className={"text text_type_main-large"}>{header}</h2>}
        </div>
        <div className={style.close_icon}>
          <CloseIcon type="primary" onClick={onDestroyModal} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
