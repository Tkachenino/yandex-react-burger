import { useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "../../data/hooks";
import { rebaseItems, removeIngredient } from "../../services/action-creators/constructor";
import style from "./burger-constructor-drag-ingredient.module.css";
import { TIngredient } from "../../data/types";

type TBurgerDnDIngredientProps = {
  id: string;
  item: TIngredient;
  index: number;
};

const BurgerConstructorDragIngredient: React.FC<TBurgerDnDIngredientProps> = ({
  id,
  item,
  index,
}: TBurgerDnDIngredientProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const [{ handlerId }, dropRef] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number; id: string }, monitor) {
      console.log(item);
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset === null) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(rebaseItems({ dragIndex, hoverIndex }));

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
        handleClose={() => dispatch(removeIngredient({ id }))}
      />
    </li>
  );
};

export default BurgerConstructorDragIngredient;
