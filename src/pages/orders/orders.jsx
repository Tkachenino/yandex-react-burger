import { NavLink } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "src/services/effects";
import style from "./orders.module.css";

const Orders = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerLogout = () => {
    dispatch(logout(history));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.navWrapper}>
        <nav className={style.nav}>
          <div className={style.navItemWrapper}>
            <NavLink
              to="/profile"
              className={`text text_type_main-medium ${style.navLink}`}
              activeClassName={style.activeLink}
            >
              Профиль
            </NavLink>
          </div>

          <div className={style.navItemWrapper}>
            <NavLink
              to="/profile/orders"
              className={`text text_type_main-medium ${style.navLink}`}
              activeClassName={style.activeLink}
            >
              История заказов
            </NavLink>
          </div>

          <div className={style.navItemWrapper}>
            <button className={style.navButton} onClick={handlerLogout}>
              <p className={`text text_type_main-medium ${style.navLink}`}>Выход</p>
            </button>
          </div>
        </nav>

        <p className={`text text_color_inactive ${style.description}`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>

      <form className={style.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          ref={nameRef}
          icon={"EditIcon"}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          error={false}
          ref={emailRef}
          icon={"EditIcon"}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={(e) => setPassword(e.target.value)}
          icon={"EditIcon"}
          value={password}
          name={"password"}
          error={false}
          ref={passwordRef}
          // onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div>
          <Button type="secondary" size="medium">
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Orders;
