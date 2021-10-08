import { Link, useHistory } from "react-router-dom";
import styles from "./SignIn.module.scss";
import commonStyles from "./Auth.module.scss";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase, { uiConfig } from "../../Firebase";
import "firebaseui/dist/firebaseui.css";
import { useEffect, useState } from "react";
import { signInWithFullImage, validateEmail } from "../../Service/functions";
import { signIn } from "../../Service/api/authApi";
import { useDispatch } from "react-redux";
import { profileAction } from "../../Store/profileSlice";
import { tokenAction } from "../../Store/tokenSlice";
import { useSelector } from "react-redux";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errorInfo, setErrorInfo] = useState({
    email: false,
    password: false,
    wrongInfo: false,
  });
  const [rememberUser, setRememberUser] = useState(false);
  // const [isHaveGoogleToken, setIsHaveGoogleToken] = useState(false);
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       setIsHaveGoogleToken(!!user);
  //     });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  useEffect(() => {
    if (token) {
      history.replace("/home");
    }
  }, [token, history]);

  const inputHanlder = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    setUserInfo((prevValue) => ({ ...prevValue, [type]: value }));
  };

  const changeRemember = () => {
    setRememberUser(!rememberUser);
  };

  const checkValidInfo = () => {
    let email = false;
    let password = false;
    if (!validateEmail(userInfo.email)) {
      email = true;
    }
    if (userInfo.password.length < 8 || userInfo.password.length > 30) {
      password = true;
    }
    setErrorInfo({
      email,
      password,
    });

    return !(email || password);
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    if (checkValidInfo()) {
      try {
        const response = await signIn(userInfo);
        console.log(response);
        if (response.status === "Login success") {
          const { profile, token } = response;

          // dispatch(profileAction.signInToEvma(profile));
          await signInWithFullImage(profile, dispatch)
          dispatch(tokenAction.addToken(token));

          if (!rememberUser) {
            localStorage.setItem("RELOAD_LEFT", 1);
          }
          // history.push("/home");
        } else {
          setErrorInfo((prevValue) => ({ ...prevValue, wrongInfo: true }));
        }
      } catch (error) {
        console.log("Fail when signup " + error);
      }
    } else {
      setUserInfo((prevValue) => ({ ...prevValue, password: "" }));
    }
  };

  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.login__box}`}>
        <div className={`${styles.login__poster}`}></div>
        <div className={`${styles.login__content}`}>
          <h1>EVMA</h1>
          <h3>Welcome back to EVMA</h3>
          <p>
            First time ? <Link to="/sign-up">Create an account</Link>
          </p>
          <form className={`${commonStyles.form}`} onSubmit={signInHandler}>
            {errorInfo.wrongInfo && (
              <p className={`${commonStyles.form__error}`}>
                Username or password not correct
              </p>
            )}
            <div className={`${styles.login__form__group}`}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className={`${commonStyles.form__input}`}
                onChange={inputHanlder}
                value={userInfo.email}
              />
            </div>
            {errorInfo.email && (
              <p className={`${commonStyles.form__error}`}>
                Your email format must be correct
              </p>
            )}
            <div className={`${styles.login__form__group}`}>
              <label htmlFor="password">
                Password <Link to="/forgot-password">Forgot password ?</Link>
              </label>
              <input
                type="password"
                id="password"
                className={`${commonStyles.form__input}`}
                onChange={inputHanlder}
                value={userInfo.password}
              />
            </div>
            {errorInfo.password && (
              <p className={`${commonStyles.form__error}`}>
                Your password must have 8-30 characters
              </p>
            )}

            <div className={`${styles.login__form__checkbox}`}>
              <input
                type="checkbox"
                id="remember"
                value={rememberUser}
                onChange={changeRemember}
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <button
              type="submit"
              className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
            >
              Sign In
            </button>
          </form>
          <div className={`${commonStyles.separator}`}>OR</div>
          {/* <button
            type="submit"
            className={`${commonStyles.btn} ${commonStyles.btn_primary_outline}`}
          >
            <img
              src="/images/google-icon.png"
              alt="Google icon"
              className={`${commonStyles.icon}`}
            />
            Google
          </button> */}
          <div className={commonStyles.googleBtn}>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
