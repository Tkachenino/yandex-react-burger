import { Link } from "react-router-dom";
import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "src/services/effects";
import style from "./login.module.css";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, history));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.conentWrapper}>
        <Logo />
        <form className={style.form} onSubmit={onSubmit}>
          <h2 className="text text_type_main-medium">Вход</h2>

          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            ref={emailRef}
            // onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            icon={"ShowIcon"}
            value={password}
            name={"name"}
            error={false}
            ref={inputRef}
            // onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>

        <div className={style.helperWrapper}>
          <p className="text text_type_main-default  text_color_inactive">
            Вы — новый пользователь?{" "}
            <Link to="/register" className={style.link}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default  text_color_inactive">
            Забыли пароль?{" "}
            <Link to="/forgot-password" className={style.link}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
