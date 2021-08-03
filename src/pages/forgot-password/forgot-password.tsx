import { Link, useHistory } from "react-router-dom";
import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { checkEmail } from "../../services/effects";
import style from "./forgot-password.module.css";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const emailRef = useRef(null);
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(checkEmail(email, history));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.conentWrapper}>
        <Logo />
        <form className={style.form} onSubmit={onSubmit}>
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            ref={emailRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Button type="primary" size="medium">
            Восстановить
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

export default ForgotPassword;
