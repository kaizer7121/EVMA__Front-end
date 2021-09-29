import { Link } from "react-router-dom";
import styles from "./SignUp.module.scss";
import commonStyles from "./Auth.module.scss";
import { useState } from "react";
import { validateEmail, validateName } from "../Service/functions.js";

const SignUp = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [errorRegister, setErrorRegister] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
  });
  const inputHanlder = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    setRegisterInfo((prevValue) => ({ ...prevValue, [type]: value }));
  };

  const checkValidInfo = () => {
    let email = false;
    let password = false;
    let confirmPassword = false;
    let fullName = false;
    if (!validateEmail(registerInfo.email)) {
      email = true;
    }
    if (registerInfo.password.length < 8 || registerInfo.password.length > 30) {
      password = true;
    }
    if (registerInfo.confirmPassword !== registerInfo.password) {
      confirmPassword = true;
    }
    if (!validateName(registerInfo.fullName)) {
      fullName = true;
    }
    setErrorRegister({
      email,
      password,
      confirmPassword,
      fullName,
    });

    return !(email || password || confirmPassword || fullName);
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    if (checkValidInfo()) {
      console.log(registerInfo);
    } else {
      setRegisterInfo((prevValue) => ({
        ...prevValue,
        password: "",
        confirmPassword: "",
      }));
    }
  };

  return (
    <div className={`${styles.register}`}>
      <div className={`${styles.register__box}`}>
        <div className={`${styles.register__poster}`}></div>
        <div className={`${styles.register__content}`}>
          <h1>EVMA</h1>
          <p>
            Already have account ? <Link to="/sign-in">Sign in</Link>
          </p>
          <form className={`${commonStyles.form}`} onSubmit={signUpHandler}>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className={`${commonStyles.form__input}`}
                value={registerInfo.email}
                onChange={inputHanlder}
              />
              {errorRegister.email && (
                <p className={`${commonStyles.form__error}`}>
                  Your email format must be correct
                </p>
              )}
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className={`${commonStyles.form__input}`}
                value={registerInfo.password}
                onChange={inputHanlder}
              />
              {errorRegister.password && (
                <p className={`${commonStyles.form__error}`}>
                  Your password must have 8-30 characters
                </p>
              )}
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`${commonStyles.form__input}`}
                value={registerInfo.confirmPassword}
                onChange={inputHanlder}
              />
              {errorRegister.confirmPassword && (
                <p className={`${commonStyles.form__error}`}>
                  Your confirm password doesn't the same as password
                </p>
              )}
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="fullName"
                className={`${commonStyles.form__input}`}
                value={registerInfo.fullName}
                onChange={inputHanlder}
              />
              {errorRegister.fullName && (
                <p className={`${commonStyles.form__error}`}>
                  Full name must have 1-50 character and must not have number
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
            >
              Create An Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
