import { Link } from "react-router-dom";
import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import style from "./reset-password.module.css";

const ResetPassword = () => {
  const passwordRef = useRef(null);
  const codeRef = useRef(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={style.wrapper}>
      <div className={style.conentWrapper}>
        <Logo />
        <form className={style.form}>
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
            // onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={"code"}
            error={false}
            ref={codeRef}
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
  );
};

export default ResetPassword;
