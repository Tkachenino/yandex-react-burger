import { useEffect, useCallback } from "react";
import style from "./modal-overlay.module.css";

type TOverlayProps = {
  onDestroyModal: () => void;
};

const ModalOverlay: React.FC<TOverlayProps> = ({ onDestroyModal }: TOverlayProps) => {
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

export default ModalOverlay;
