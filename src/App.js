import { Switch, Route, Redirect } from "react-router-dom";

import ForgotPassword from "./Components/Auth/ForgotPassword";

import "./App.scss";

import { useEffect } from "react";
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
import {
  signInWithFullImage,
  updateListCategoryToStore,
} from "./Service/functions";
import ConfirmDeletePost from "./Components/Popup/ConfirmDeletePost";
import SearchEventPage from "./Pages/SearchEventPage";
import { getAllCategoryFromDB } from "./Service/api/eventApi";
import OwnEventPage from "./Pages/OwnEventPage";
import EventFilter from "./Components/Filter/EventFilter";
import {
  getAllNotiInLast3Days,
  getListFollowFromUser,
  ListenDataChangeFromFollowList,
} from "./Service/firebaseFunctions";
import { useState } from "react";
import { notificationAction } from "./Store/notificationSlice";
import ListNotification from "./Components/Notification/ListNotification";

let isGetFollowList = false;

function App() {
  const token = useSelector((state) => state.token.token);
  const listCategory = useSelector((state) => state.categories.listCategory);

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

    if (listCategory[0] === "Empty") {
      try {
        getAllCategoryFromDB().then((response) => {
          updateListCategoryToStore(response, dispatch);
        });
      } catch (error) {
        console.log("FAIL WHEN GET CATEGORIES " + error);
      }
    }
    if (!token || !userID) {
      console.log("DELETE ACCOUNT");
      dispatch(profileAction.signOut());
      dispatch(tokenAction.deleteToken());
    } else {
      getProfilebyID(userID)
        .then((profile) => {
          if (profile) {
            signInWithFullImage(profile, dispatch);
            if (!isGetFollowList) {
              isGetFollowList = true;
              getListFollowFromUser("4").then(
                async (snapshot) => {
                  if (snapshot) {
                    let { followedEvents, followedOrganizers } = snapshot;
                    followedEvents = followedEvents.map(
                      (eventID) => `${eventID}_e`
                    );

                    followedOrganizers = followedOrganizers.map(
                      (organizationID) => `${organizationID}_o`
                    );
                    await getAllNotiInLast3Days(
                      [...followedEvents],
                      [...followedOrganizers],
                      dispatch
                    );
                    await ListenDataChangeFromFollowList(
                      [...followedEvents],
                      [...followedOrganizers],
                      dispatch
                    );
                  }
                }
              );
            }
          } else {
            dispatch(profileAction.signOut());
            dispatch(tokenAction.deleteToken());
          }
        })
        .catch(() => {
          dispatch(profileAction.signOut());
          dispatch(tokenAction.deleteToken());
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
  }, [token, dispatch, listCategory]);

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

      <Route exact path="/event/:id">
        <EventDetaiPage />
      </Route>
      <Route exact path="/ownEvent/">
        <OwnEventPage />
      </Route>
      <Route exact path="/event">
        <AllEventPage />
      </Route>
      <Route exact path="/organization">
        <ListOrganizationPage />
      </Route>
      <Route exact path="/organization/:id">
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
      <Route path="/search">
        <SearchEventPage />
      </Route>
      <Route path="/test">
        <ListNotification />
      </Route>
      <Route exact path="*">
        <Redirect to="/event" />
      </Route>
    </Switch>
  );
}

export default App;
