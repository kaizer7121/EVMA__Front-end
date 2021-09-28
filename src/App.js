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
import ConfirmImage from "./components/Popup/ConfirmImage";
import { useEffect } from "react";
import firebase from "./Firebase";

function App() {
  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        // setIsSignedIn(!!user);
        if (!user) {
          return console.log("Log out");
        }
        console.log(user.displayName);
        console.log("======================");
        const token = await user.getIdToken();
        console.log(token);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

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
      <Route path="/test">
        {/* <NavigationBar /> */}
        <ConfirmImage />
      </Route>
      <Route path="*">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

export default App;
