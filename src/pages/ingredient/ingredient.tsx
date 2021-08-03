import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "../../data/hooks";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../../components/loader";
import ErrorBounder from "../../components/error-bounder";
import { getIngredients } from "../../services/effects";
import style from "./ingredient.module.css";

const Ingredient: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const { ingredients, loading, error } = useSelector((store) => store.ingredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  const currentIngredient = useMemo(() => {
    return ingredients.find((i) => i._id === id) || null;
  }, [ingredients, id]);

  useEffect(() => {
    if (!!ingredients.length && currentIngredient === null) {
      history.replace("/404");
    }
  }, [currentIngredient, ingredients, history]);

  return (
    <div className={style.wrapper}>
      {loading && !error && <Loader />}
      {!loading && !!error && <ErrorBounder errorMessage={error} />}
      {!loading && !error && !!currentIngredient && (
        <div className={style.content}>
          <h1 className="text text_type_main-large">Детали ингредиента</h1>
          <img className={style.image} src={currentIngredient.image_large} />
          <h3 className={`${style.header} text text_type_main-medium mt-4 mb-8`}>
            {currentIngredient.name}
          </h3>
          <div className={style.info_list}>
            <div className={style.info_item}>
              <p className=" text text_type_main-default text_color_inactive">Калории, ккал</p>
              <p className="text text_type_digits-default  text_color_inactive">
                {currentIngredient.calories}
              </p>
            </div>
            <div className={style.info_item}>
              <p className=" text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default  text_color_inactive">
                {currentIngredient.proteins}
              </p>
            </div>
            <div className={style.info_item}>
              <p className=" text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default  text_color_inactive">
                {currentIngredient.fat}
              </p>
            </div>
            <div className={style.info_item}>
              <p className=" text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default  text_color_inactive">
                {currentIngredient.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredient;
