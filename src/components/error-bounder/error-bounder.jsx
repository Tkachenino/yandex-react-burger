import style from "./error-bounder.module.css";
import PropTypes from "prop-types";

const ErrorBounder = ({ errorMessage }) => {
  return (
    <div>
      <p className={`${style.instruction} text text_type_main-default`}>
        Упс! Кажеться что то сломалось!
      </p>
      <p className={`${style.errorText} text text_type_main-medium`}>{errorMessage}</p>
      <p className={`${style.instruction} text text_type_main-default`}>
        Пожалуйста, обновите страницу, либо свяжитесь с оператором горячей линии.
      </p>
    </div>
  );
};

ErrorBounder.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorBounder;
