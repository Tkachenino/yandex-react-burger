import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${style.header} pl-4 pr-4 pb-4 pt-4`}>
      <nav className={style.header_wrapper}>
        <div className={style.button_wrapper}>
          <button className={`${style.button} text text_type_main-default pl-5 pr-5 pb-4 pt-4`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default t ml-2">Конструктор</p>
          </button>
          <button
            className={`${style.button} text text_type_main-default  ml-2  pl-5 pr-5 pb-4 pt-4`}
          >
            <ListIcon type="secondary" />
            <p className=" text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </button>
        </div>

        <button className={`${style.button} text text_type_main-default   pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive  ml-2">Личный кабинет</p>
        </button>

        <div className={style.logo}>
          <Logo />
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
