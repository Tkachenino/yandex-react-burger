import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./burger-ingredients-item.module.css";

const BurgerIngredientsItem = ({ data, openModal }) => {
  const { constructorIngredient, bun } = useSelector((state) => state.constructorIngredient);

  const count = useMemo(() => {
    if (data.type === "bun" && bun && bun._id === data._id) {
      return 2;
    } else if (constructorIngredient.some((item) => item._id === data._id)) {
      return constructorIngredient.filter((item) => item._id === data._id).length;
    }
    return 0;
  }, [bun, constructorIngredient, data._id, data.type]);

  const [, ref] = useDrag({
    type: "ingredient",
    item: data,
  });

  return (
    <div className={style.wrapper} onClick={openModal}>
      {!!count && <Counter count={count} size="default" />}
      <img ref={ref} className={style.image} src={data.image} />
      <div className={style.price_wrapper}>
        <p className="text text_type_digits-default mr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.description} text text_type_main-default`}>{data.name}</p>
    </div>
  );
};

BurgerIngredientsItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }),
  openModal: PropTypes.func,
};

export default BurgerIngredientsItem;
