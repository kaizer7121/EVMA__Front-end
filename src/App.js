import { Switch, Route, Redirect } from "react-router-dom";

import ForgotPassword from "./Components/Auth/ForgotPassword";

import "./App.scss";

import { useEffect } from "react";
import firebase from "./Firebase";
import CreatePost from "./Components/Popup/CreatePost";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import AllEventPage from "./Pages/AllEventPage";
import ListOrganizationPage from "./Pages/ListOrganizationPage";
import OrganizationDetailPage from "./Pages/OrganizationDetailPage";
import EventDetaiPage from "./Pages/EventDetaiPage";
import EventCreationPage from "./Pages/EventCreationPage";
import ProfilePage from "./Pages/ProfilePage";

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
        // console.log(user.displayName);
        // console.log("======================");
        // const token = await user.getIdToken();
        // console.log(token);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  useEffect(() => {
    console.log("EFFECT");
    const token = localStorage.getItem("TOKEN");
  }, []);

  return (
    <Switch>
      <Route path="/sign-in">
        <SignInPage />
      </Route>
      <Route path="/sign-up">
        <SignUpPage />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route exact path="/event">
        <AllEventPage />
      </Route>
      <Route path="/event/:id">
        <EventDetaiPage />
      </Route>
      <Route exact path="/organization">
        <ListOrganizationPage />
      </Route>
      <Route path="/organization/:id">
        <OrganizationDetailPage />
      </Route>
      <Route path="/create">
        <EventCreationPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/test">
        <CreatePost />
      </Route>
      <Route path="*">
        <Redirect to="/event" />
      </Route>
    </Switch>
  );
}

export default App;
