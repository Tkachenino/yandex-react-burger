import PropTypes from "prop-types";
import style from "./Modal-overlay.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={style.overlay} onClick={props.onDestroyModal}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onDestroyModal: PropTypes.func,
  children: PropTypes.element,
};

export default ModalOverlay;
