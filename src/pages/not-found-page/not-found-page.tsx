import React from "react";
import { Link } from "react-router-dom";
import Image from "../../images/blackhole.png";
import style from "./not-found-page.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img className={style.image} src={Image} width="300" />
      <p className={`text text_type_main-large ${style.text}`}>
        Вы попали на неопознанную территорию!
        <br /> Скорее <Link to="/">беги</Link> отсюда
      </p>
    </div>
  );
};

export default NotFoundPage;
