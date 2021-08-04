import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetail from "../order-detail";
import Modal from "../modal";
import dayjs from "dayjs";
import style from "./order-card.module.css";
import { TIngredient, TOrder } from "../../data/types";

type TOrderCardProps = {
  order: TOrder;
  ingredients: ReadonlyArray<TIngredient>;
};

type TStatusDictionary = {
  [key: string]: string;
};

const statusDictionary: TStatusDictionary = {
  done: "Выполнен",
  pending: "Готовиться",
  create: "Создан",
};

const OrderCard: React.FC<TOrderCardProps> = ({ order, ingredients }: TOrderCardProps) => {
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    window.history.replaceState(null, "", `${location.pathname}/${order.number}`);
    setShowModal(true);
  };

  const currentIngredients = useMemo(() => {
    const infoArray = order.ingredients
      .filter((i) => i !== null)
      .map((i) => {
        return ingredients.find((ingredient) => {
          return ingredient._id === i;
        });
      });

    const uniqInfoArray: Array<TIngredient & { count: number }> = [];
    infoArray.forEach((infoItem) => {
      if (uniqInfoArray.some((uniqItem) => uniqItem._id === infoItem?._id)) {
        const idx = uniqInfoArray.findIndex((i) => i._id === infoItem?._id);
        uniqInfoArray[idx] = { ...uniqInfoArray[idx], count: ++uniqInfoArray[idx].count };
      } else {
        if (infoItem === undefined) {
          return;
        }
        uniqInfoArray.push({ ...infoItem, count: 1 });
      }
    });

    return uniqInfoArray;
  }, [order, ingredients]);

  const orderTotalCost = useMemo(() => {
    return currentIngredients.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  }, [currentIngredients]);

  return (
    <>
      <div className={style.ordersItem} onClick={openModal}>
        <div className={style.orderInfo}>
          <p className={`text text_type_digits-default ${style.id}`}>#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {dayjs(new Date(order.createdAt)).fromNow()},{" "}
            {dayjs(new Date(order.createdAt)).format("HH:mm")} i-GMT
            {dayjs(new Date(order.createdAt)).format("Z").split(":")[0]}
          </p>
        </div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        <p className={`text text_type_main-default ${order.status === "done" ? style.done : ""}`}>
          {statusDictionary[order.status]}
        </p>
        <div className={style.ingredientsInfo}>
          <div className={style.ingredientsList}>
            {currentIngredients.map((ingredient, idx) => (
              <div
                className={style.ingredientWrapper}
                key={idx}
                style={{ zIndex: currentIngredients.length - idx }}
              >
                <div className={style.ingredient}>
                  <img src={ingredient.image_mobile} width="64" />
                  {ingredient.count > 1 && (
                    <div className={style.countWrapper}>
                      <p className="text text_type_main-default">+{ingredient.count - 1}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={style.ingredientsCost}>
            <p className="text text_type_digits-default">{orderTotalCost}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          header={`#${order.number}`}
          onDestroyModal={() => {
            window.history.replaceState(null, "", `${location.pathname}`);
            setShowModal(false);
          }}
        >
          <OrderDetail order={order} ingredients={ingredients} />
        </Modal>
      )}
    </>
  );
};

export default OrderCard;
