import { Link, useHistory } from "react-router-dom";
import styles from "./SignIn.module.scss";
import commonStyles from "./Auth.module.scss";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase, { uiConfig } from "../../Firebase";
import "firebaseui/dist/firebaseui.css";
import { useEffect, useState } from "react";
import { signInWithFullImage, validateEmail } from "../../Service/functions";
import { exchangeFirebaseToken } from "../../Service/api/authApi";
import { useDispatch } from "react-redux";
import { tokenAction } from "../../Store/tokenSlice";
import { useSelector } from "react-redux";
import { profileAction } from "../../Store/profileSlice";

const SignIn = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isAccountUnable, setIsAccountUnable] = useState(false);

  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        await firebase.auth().signOut();
        setIsWaiting(false);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        console.log("check");
        if (user) {
          setIsWaiting(true);
          const token = await user.getIdToken();
          const params = {
            token,
          };
          const response = await exchangeFirebaseToken(params);
          if (response.status === "Login success") {
            localStorage.setItem("TOKEN", response.token);
            dispatch(profileAction.signInToEvma(response.profile));
            dispatch(tokenAction.addToken(response.token));
          } else if (response.status === "Unable") {
            setIsAccountUnable(true);
          }
        }
      });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      // history.push("/home");
      history.goBack();
    }
  }, [token, history]);

  // const loginWithGoogleHandler = async () => {
  //   const googleUrl = await getGoogleLoginLink();
  //   if (googleUrl) {
  //     setGoogleLink(googleUrl);
  //   }
  // };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.login__box}`}>
        <div className={`${styles.login__poster}`}></div>
        <div className={`${styles.login__content}`}>
          <div className={`${styles.login__content_detail}`}>
            <div className={`${styles.login__content_detail_title}`}>
              <h1>EVMA</h1>
              <h3>Welcome back to EVMA</h3>
            </div>

            {isAccountUnable && (
              <div className={styles.login__content_unable}>
                <p>
                  Your account is now unable, you have to wait to be activated
                </p>
                <button
                  className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
                  onClick={reloadPage}
                >
                  Retry
                </button>
              </div>
            )}
            {!isAccountUnable && isWaiting && (
              <div
                className={`${commonStyles.loader_icon_big} ${styles.login__content_detail_button}`}
              ></div>
            )}
            {!isAccountUnable && !isWaiting && (
              <div
                className={`${commonStyles.googleBtn} ${styles.login__content_detail_button}`}
              >
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
                {/* <button onClick={loginWithGoogleHandler}>
                  <img src="images/google-icon.png" alt="Google logo" />
                  <span>Sign in with google</span>
                </button> */}
              </div>
            )}

            <div className={`${styles.login__content_detail_text}`}>
              <p>Feel free to join with us</p>
              <span
                className={`${styles.login__content_detail_text_copyRight}`}
              >
                &copy; 2021 by Harry. All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
