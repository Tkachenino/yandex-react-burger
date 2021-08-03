import { Link, useHistory } from "react-router-dom";
import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef } from "react";
import { useDispatch } from "../../data/hooks";
import { createNewProfile } from "../../services/effects";
import style from "./register.module.css";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewProfile({ email, password, name }, history));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.conentWrapper}>
        <Logo />
        <form className={style.form} onSubmit={onSubmit}>
          <h2 className="text text_type_main-medium">Регистрация</h2>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            ref={nameRef}
            errorText={"Ошибка"}
            size={"default"}
          />
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
            name={"password"}
            error={false}
            ref={passwordRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={style.helperWrapper}>
          <p className="text text_type_main-default  text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link to="/login" className={style.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
