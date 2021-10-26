import { Switch, Route, Redirect } from "react-router-dom";

import ForgotPassword from "./Components/Auth/ForgotPassword";

import "./App.scss";

import { useEffect } from "react";
import SignInPage from "./Pages/SignInPage";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import AllEventPage from "./Pages/AllEventPage";
import ListOrganizationPage from "./Pages/ListOrganizationPage";
import OrganizationDetailPage from "./Pages/OrganizationDetailPage";
import EventDetaiPage from "./Pages/EventDetaiPage";
import EventCreationPage from "./Pages/EventCreationPage";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "./Store/profileSlice";
import { tokenAction } from "./Store/tokenSlice";
import { getCurrentProfile } from "./Service/api/authApi";
import {
  signInWithFullImage,
  updateListCategoryToStore,
} from "./Service/functions";
import SearchEventPage from "./Pages/SearchEventPage";
import { getAllCategoryFromDB } from "./Service/api/eventApi";
import OwnEventPage from "./Pages/OwnEventPage";
import {
  getAllNotiInLast3Days,
  getListFollowFromUser,
  ListenDataChangeFromFollowList,
} from "./Service/firebaseFunctions";
import ListFollowPage from "./Pages/ListFollowPage";
import LoadingComponent from "./Components/Loading/LoadingComponent";
import { useState } from "react";

let isGetFollowList = false;

function App() {
  const token = useSelector((state) => state.token.token);
  const profile = useSelector((state) => state.profile);
  const listCategory = useSelector((state) => state.categories.listCategory);
  const [isLoading, setIsLoading] = useState(true);

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
    if (listCategory[0] === "Empty") {
      try {
        getAllCategoryFromDB().then((response) => {
          updateListCategoryToStore(response, dispatch);
        });
      } catch (error) {
        console.log("FAIL WHEN GET CATEGORIES " + error);
      }
    }
    if (!token) {
      dispatch(profileAction.signOut());
      dispatch(tokenAction.deleteToken());
      dispatch(profileAction.clearFollowList());
      setIsLoading(false);
    } else {
      getCurrentProfile()
        .then((profile) => {
          if (profile) {
            signInWithFullImage(profile, dispatch);
            if (!isGetFollowList) {
              isGetFollowList = true;
              getListFollowFromUser(profile.id.toString()).then(
                async (snapshot) => {
                  if (snapshot) {
                    let { followedEvents, followedOrganizers } = snapshot;
                    if (followedEvents) {
                      followedEvents = followedEvents.map(
                        (eventID) => `${eventID}_e`
                      );
                    } else {
                      followedEvents = [];
                    }

                    if (followedOrganizers) {
                      followedOrganizers = followedOrganizers.map(
                        (organizationID) => `${organizationID}_o`
                      );
                    } else {
                      followedOrganizers = [];
                    }

                    dispatch(profileAction.clearFollowList());
                    dispatch(
                      profileAction.addFollowedEvents([...followedEvents])
                    );
                    dispatch(
                      profileAction.addFollowedOrganizers([
                        ...followedOrganizers,
                      ])
                    );
                    await getAllNotiInLast3Days(
                      [...followedEvents],
                      [...followedOrganizers],
                      dispatch
                    );
                    await ListenDataChangeFromFollowList(
                      followedEvents,
                      followedOrganizers,
                      dispatch
                    );
                    setIsLoading(false);
                  } else {
                    setIsLoading(false);
                  }
                }
              );
            }
          } else {
            dispatch(profileAction.signOut());
            dispatch(tokenAction.deleteToken());
            dispatch(profileAction.clearFollowList());
            setIsLoading(false);
          }
        })
        .catch(() => {
          dispatch(profileAction.signOut());
          dispatch(tokenAction.deleteToken());
          dispatch(profileAction.clearFollowList());
          setIsLoading(false);
        });
    }
    // const left = localStorage.getItem("RELOAD_LEFT");

    // if (left === "0") {
    //   dispatch(profileAction.signOut());
    //   dispatch(tokenAction.deleteToken());
    //   localStorage.removeItem("RELOAD_LEFT");
    // }
    // if (left === "1") {
    //   localStorage.setItem("RELOAD_LEFT", 0);
    // }
    // if (left === "2") {
    //   localStorage.setItem("RELOAD_LEFT", 1);
    // }
  }, [token, dispatch, listCategory]);

  return (
    <>
      {isLoading && <LoadingComponent />}
      {profile.role === null && (
        <Switch>
          <Route path="/update-profile">
            <UpdateProfilePage />
          </Route>
          <Route exact path="*">
            <Redirect to="/update-profile" />
          </Route>
        </Switch>
      )}
      {profile.role !== null && !isLoading && (
        <Switch>
          <Route path="/sign-in">
            <SignInPage />
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
          <Route path="/listFollow">
            <ListFollowPage />
          </Route>
          <Route path="/search">
            <SearchEventPage />
          </Route>
          <Route path="/test">
            <LoadingComponent />
          </Route>
          <Route exact path="*">
            <Redirect to="/event" />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
