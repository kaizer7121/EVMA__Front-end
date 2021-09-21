import { Switch, Route, Redirect } from "react-router-dom";

import NavigationBar from "./components/Navigation/NavigationBar";
import SideNavigation from "./components/Navigation/SideNavigation";
import SignIn from "./components/Auth/SignIn";
import ListEvent from "./components/Events/ListEvent";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EventDetail from "./components/Events/EventDetail";

import "./App.scss";


function App() {
  return (
    <Switch>
      <Route path="/home">
        <NavigationBar />
        <SideNavigation />
        <ListEvent />
      </Route>
      <Route path="/detail">
        <NavigationBar />
        <SideNavigation />
        <EventDetail />
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
