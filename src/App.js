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
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "./Store/profileSlice";
import { tokenAction } from "./Store/tokenSlice";
import { getProfilebyID } from "./Service/api/authApi";
import { signInWithFullImage } from "./Service/functions";
import ConfirmDelete from "./Components/Popup/ConfirmDelete";

function App() {
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();
  // Handle firebase auth changed
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged(async (user) => {
  //       // setIsSignedIn(!!user);
  //       if (!user) {
  //         return console.log("Log out");
  //       }
  //       // console.log(user.displayName);
  //       // console.log("======================");
  //       // const token = await user.getIdToken();
  //       // console.log(token);
  //     });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  useEffect(() => {
    const userID = localStorage.getItem("USER_ID");
    console.log("EFFECT");
    if (!token || !userID) {
      console.log("DELETE ACCOUNT");
      dispatch(profileAction.signOut());
      dispatch(tokenAction.deleteToken());
    } else {
      getProfilebyID(userID).then((profile) => {
        // dispatch(profileAction.signInToEvma(profile));
        signInWithFullImage(profile, dispatch);
      });
    }
    const left = localStorage.getItem("RELOAD_LEFT");
    console.log(left);
    if (left === "0") {
      dispatch(profileAction.signOut());
      dispatch(tokenAction.deleteToken());
      localStorage.removeItem("RELOAD_LEFT");
    }
    if (left === "1") {
      localStorage.setItem("RELOAD_LEFT", 0);
    }
  }, [token, dispatch]);

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
      <Route path="/edit/:id">
        <EventCreationPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/test">
        <ConfirmDelete />
      </Route>
      <Route path="*">
        <Redirect to="/event" />
      </Route>
    </Switch>
  );
}

export default App;
