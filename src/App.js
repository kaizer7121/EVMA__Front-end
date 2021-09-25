import { Switch, Route, Redirect } from "react-router-dom";

import NavigationBar from "./components/Navigation/NavigationBar";
import SideNavigation from "./components/Navigation/SideNavigation";
import SignIn from "./components/Auth/SignIn";
import ListEvent from "./components/Events/ListEvent";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import EventDetail from "./components/Events/EventDetail";
import EventCreation from "./components/Events/EventCreation";
import ListOrganization from "./components/Organizations/ListOrganization";
import OrganizationDetail from "./components/Organizations/OrganizationDetail";

import "./App.scss";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Switch>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/home">
        <NavigationBar />
        <SideNavigation />
        <ListEvent />
      </Route>
      <Route path="/organizations">
        <NavigationBar />
        <SideNavigation />
        <ListOrganization />
      </Route>
      <Route path="/organization-detail">
        <NavigationBar />
        <SideNavigation />
        <OrganizationDetail />
      </Route>
      <Route path="/event-detail">
        <NavigationBar />
        <SideNavigation />
        <EventDetail />
      </Route>
      <Route path="/create">
        <NavigationBar />
        <EventCreation />
      </Route>
      <Route path="/profile">
        <NavigationBar />
        <Profile />
      </Route>
      <Route path="*">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default App;
