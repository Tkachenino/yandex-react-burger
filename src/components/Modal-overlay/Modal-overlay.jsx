import Modal from "../Modal";
import PropTypes from "prop-types";
import style from "./Modal-overlay.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={style.overlay} onClick={props.onDestroyModal}>
      <Modal onDestroyModal={props.onDestroyModal} />
    </div>
  );
};

ModalOverlay.propTypes = {
  onDestroyModal: PropTypes.func,
};

export default ModalOverlay;
