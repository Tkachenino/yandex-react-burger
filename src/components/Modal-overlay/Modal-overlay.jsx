import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import style from "./Modal-overlay.module.css";

const ModalOverlay = ({ onDestroyModal }) => {
  const destroyModalOnEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onDestroyModal();
      }
    },
    [onDestroyModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", destroyModalOnEsc);
    return () => {
      document.removeEventListener("keydown", destroyModalOnEsc);
    };
  }, [destroyModalOnEsc]);

  return <div className={style.overlay} onClick={onDestroyModal}></div>;
};

ModalOverlay.propTypes = {
  onDestroyModal: PropTypes.func,
};

export default ModalOverlay;
