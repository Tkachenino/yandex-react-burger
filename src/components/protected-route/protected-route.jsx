import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((store) => store.profile);

  return (
    <Route
      {...rest}
      render={() => {
        return isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
