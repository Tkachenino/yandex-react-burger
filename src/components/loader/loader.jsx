import style from "./loader.module.css";

const Loader = () => {
  return (
    <div>
      <div className={`${style.loader}`}>
        <div></div>
        <div></div>
      </div>
      <p className={`${style.light} text text_type_main-medium mt-10 mb-5`}>
        Идет сверхзвуковая передача данных. Пожалуйста, ожидайте.
      </p>
    </div>
  );
};

export default Loader;
