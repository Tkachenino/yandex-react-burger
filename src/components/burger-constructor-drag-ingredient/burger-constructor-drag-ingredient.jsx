import { useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import style from "./burger-constructor-drag-ingredient.module.css";

import PropTypes from "prop-types";

const BurgerConstructorDragIngredient = ({ id, item, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, dropRef] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({ type: "REBASE_ITEMS", dragIndex, hoverIndex });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <li
      ref={ref}
      className={`${style.constructorItem}`}
      style={{ opacity: `${isDragging ? 0 : 1}` }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch({ type: "REMOVE_INGREDIENT", id })}
      />
    </li>
  );
};

BurgerConstructorDragIngredient.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  rebaseItems: PropTypes.func,
  id: PropTypes.string,
};

export default BurgerConstructorDragIngredient;
