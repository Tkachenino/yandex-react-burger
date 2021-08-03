import { Link } from "react-router-dom";
import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/effects";
import style from "./login.module.css";

interface IHistory extends History {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: any;
}

const Login: React.FC = () => {
  const history = useHistory<IHistory>();
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const path: IHistory = history.location?.state?.from?.pathname;
    dispatch(login({ email, password }, history, path));
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
