import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Burger-constructor-total.module.css";

const BurgerConstructorTotal = () => {
  return (
    <div className={`${style.total_wrapper} mt-10 mb-13`}>
      <div className={`${style.price_wrapper} mr-10`}>
        <p className="text text_type_digits-medium mr-2">650</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Нажми на меня
      </Button>
    </div>
  );
};

export default BurgerConstructorTotal;
