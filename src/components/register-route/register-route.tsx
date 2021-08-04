import { Redirect, Route } from "react-router-dom";
import { useSelector } from "../../data/hooks";
import { ReactNode } from "react";

type TRegisterRouteProps = {
  children: ReactNode;
  exact: boolean;
  path: string;
  rest?: Array<Route>;
};

const RegisterRoute: React.FC<TRegisterRouteProps> = ({
  children,
  ...rest
}: TRegisterRouteProps) => {
  const { isAuth } = useSelector((store) => store.profile);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
};

export default RegisterRoute;
