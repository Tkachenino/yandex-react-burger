import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

const Modal = ({ header = null, onDestroyModal, children }) => {
  return (
    <div className={style.modal} onClick={(e) => e.stopPropagation()}>
      <div className={style.header_wrapper}>
        {header && <h2 className={"text text_type_main-large"}>{header}</h2>}
      </div>
      <div className={style.close_icon}>
        <CloseIcon type="primary" onClick={onDestroyModal} />
      </div>
      {children}
    </div>
  );
};

Modal.propTypes = {
  onDestroyModal: PropTypes.func,
  children: PropTypes.element,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Modal;
