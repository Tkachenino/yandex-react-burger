import { Link } from "react-router-dom";
import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useDispatch } from "../../data/hooks";
import { setPasswordReset } from "../../services/effects";
import style from "./reset-password.module.css";

interface ILocation extends Location {
  reset: string;
}

const ResetPassword: React.FC = () => {
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const history = useHistory();
  const passwordRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPasswordReset({ password, token }, history));
  };

  return location.state?.reset && history.action === "PUSH" ? (
    <div className={style.wrapper}>
      <div className={style.conentWrapper}>
        <Logo />
        <form className={style.form} onSubmit={onSubmit}>
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <Input
            type={"text"}
            placeholder={"Введите новый пароль"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            error={false}
            icon={"ShowIcon"}
            ref={passwordRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name={"token"}
            error={false}
            ref={tokenRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={style.helperWrapper}>
          <p className="text text_type_main-default  text_color_inactive">
            Вспомнили пароль?{" "}
            <Link to="/login" className={style.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default ResetPassword;
