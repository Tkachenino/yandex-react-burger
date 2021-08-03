import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "../../data/hooks";

type TProtectedRouteProps = {
  children: ReactNode;
  exact: boolean;
  path: string;
  rest?: Array<Route>;
};

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  children,
  ...rest
}: TProtectedRouteProps) => {
  const { isAuth } = useSelector((store) => store.profile);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
