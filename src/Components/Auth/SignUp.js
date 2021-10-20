import { Link, useHistory } from "react-router-dom";
import styles from "./SignUp.module.scss";
import commonStyles from "./Auth.module.scss";
import { useEffect, useState } from "react";
import {
  calculateAge,
  validateEmail,
  validateName,
} from "../../Service/functions";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { signUp } from "../../Service/api/authApi";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    role: "",
  });
  const [userYearOld, setUserYearOld] = useState("");
  const [errorRegister, setErrorRegister] = useState({
    email: false,
    isDuplicateEmail: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    dateOfBirth: false,
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const token = useSelector((state) => state.token.token);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.replace("/home");
    }
  }, [token, history]);

  const inputHanlder = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    setRegisterInfo((prevValue) => ({ ...prevValue, [type]: value }));
  };
  const inputDateHandler = (value) => {
    if (value !== "") {
      const yearOld = calculateAge(value);
      setUserYearOld(yearOld);
    } else {
      setUserYearOld("");
    }

    setRegisterInfo((prevValue) => ({ ...prevValue, dateOfBirth: value }));
  };

  const checkValidInfo = () => {
    let email = false;
    let password = false;
    let confirmPassword = false;
    let fullName = false;
    let dateOfBirth = false;
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
    if (userYearOld < 16) {
      dateOfBirth = true;
    }
    setErrorRegister({
      email,
      password,
      confirmPassword,
      fullName,
      dateOfBirth,
    });

    return !(email || password || confirmPassword || fullName || dateOfBirth);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    if (checkValidInfo()) {
      try {
        setIsWaiting(true);
        signUp(registerInfo).then((response) => {
          setIsWaiting(false);
          if (
            response &&
            response.data &&
            response.data.message === "Data integrity violation"
          ) {
            setErrorRegister((prevValue) => ({
              ...prevValue,
              isDuplicateEmail: true,
            }));
          }
          if (!isNaN(response)) {
            if (!alert("Sign up successfully!")) {
              history.push("/sign-in");
            }
          }
        });
      } catch (error) {
        setIsWaiting(false);
        console.log(error.response);
      }
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
            {errorRegister.isDuplicateEmail && (
              <p className={`${commonStyles.form__error}`}>
                Your email is already existed
              </p>
            )}
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
            <div className={`${styles.register__form__group} `}>
              <label htmlFor="full-name">Date of birth (older than 16)</label>
              <div className={`${styles.register__form__group__date_input}`}>
                <DayPickerInput
                  format={"DD/MM/yyyy"}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder=""
                  onDayChange={(date) => {
                    if (date === undefined) date = "";
                    inputDateHandler(date);
                  }}
                  value={registerInfo.dateOfBirth}
                />
                <input
                  type="text"
                  disabled={true}
                  className={`${styles.register__form__group__date_input_age}`}
                  value={userYearOld}
                />
              </div>

              {errorRegister.dateOfBirth && (
                <p className={`${commonStyles.form__error}`}>
                  Date must be correct, age older than 16
                </p>
              )}
            </div>
            <label htmlForfor="cars">Choose a role:</label>
            <div className={`${styles.register__form__group}`}>
              <select
                id="role"
                className={`${commonStyles.form__input} ${commonStyles.form__input_large}`}
                onClick={inputHanlder}
              >
                <option value="Attendees">Attendees</option>
                <option value="Event Organizer">Event Organizer</option>
              </select>
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
                  Full name only have characters (3 - 50)
                </p>
              )}
            </div>
            {!isWaiting && (
              <button
                type="submit"
                className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
              >
                Create An Account
              </button>
            )}
            {isWaiting && (
              <button
                type="button"
                className={`${commonStyles.btn} ${commonStyles.btn_wait} ${commonStyles.btn_grey_dark}`}
              >
                <div className={commonStyles.loader_icon}></div>
                Create An Account
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
