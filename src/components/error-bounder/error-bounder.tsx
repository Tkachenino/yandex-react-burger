import style from "./error-bounder.module.css";

type TErrorBounderProps = {
  errorMessage: string;
};

const ErrorBounder: React.FC<TErrorBounderProps> = ({ errorMessage }: TErrorBounderProps) => {
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

export default ErrorBounder;
