import { Switch, Route, Redirect } from "react-router-dom";

import NavigationBar from "./components/Navigation/NavigationBar";
import SideNavigation from "./components/Navigation/SideNavigation";
import SignIn from "./components/Auth/SignIn";

import "./App.scss";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";

function App() {
  return (
    <Switch>
      <Route path="/home">
        <NavigationBar />
        <SideNavigation />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="*">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default App;
