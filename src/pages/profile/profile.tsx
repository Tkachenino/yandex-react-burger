import { NavLink } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../data/hooks";
import { useHistory } from "react-router-dom";
import { getProfile, updateProfile, logout } from "../../services/effects";
import style from "./profile.module.css";

const Profile: React.FC = () => {
  const { name: globalName, email: globalEmail } = useSelector((store) => store.profile.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!globalName && !globalEmail) {
      dispatch(getProfile());
    }
  });

  useEffect(() => {
    setName(globalName);
    setEmail(globalEmail);
  }, [globalName, globalEmail]);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>(globalName);
  const [email, setEmail] = useState<string>(globalEmail);

  const handlerLogout = () => {
    dispatch(logout(history));
  };

  const handlerCancel = () => {
    setName(globalName);
    setEmail(globalEmail);
  };

  const handlerUpdate = () => {
    dispatch(updateProfile({ name, email }));
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
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
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className={style.contentWrapper}>
        <form className={style.form} onSubmit={handlerSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            ref={nameRef}
            icon={"EditIcon"}
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
            errorText={"Ошибка"}
            size={"default"}
          />
        </form>
        <div>
          <Button type="secondary" size="medium" onClick={handlerCancel}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={handlerUpdate}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
