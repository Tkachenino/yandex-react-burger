import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ProtectedRoute from "../protected-route";
import RegisterRoute from "../register-route";

import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Orders from "../../pages/orders";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";

import "./app.module.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppHeader history={history} />
        <main>
          <Switch>
            <ProtectedRoute exact={true} path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact={true} path="/profile/orders">
              <Orders />
            </ProtectedRoute>
            <RegisterRoute exact={true} path="/reset-password">
              <ResetPassword />
            </RegisterRoute>
            <RegisterRoute exact={true} path="/forgot-password">
              <ForgotPassword />
            </RegisterRoute>
            <RegisterRoute exact={true} path="/register">
              <Register />
            </RegisterRoute>
            <RegisterRoute exact={true} path="/login">
              <Login />
            </RegisterRoute>
            <Route exact={true} path="/">
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
