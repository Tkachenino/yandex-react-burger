import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={style.modal} onClick={(e) => e.stopPropagation()}>
      <div
        style={{
          height: "60px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <p className={"text text_type_main-large"}>Детали ингредиента</p>
      </div>
      <div className={style.closeIcon}>
        <CloseIcon type="primary" onClick={props.onDestroyModal} />
      </div>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  onDestroyModal: PropTypes.func,
  children: PropTypes.elementType,
};

export default Modal;
