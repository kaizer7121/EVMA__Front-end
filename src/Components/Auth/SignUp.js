import { Link, useHistory } from "react-router-dom";
import styles from "./SignUp.module.scss";
import commonStyles from "./Auth.module.scss";
import { useState } from "react";
import { calculateAge, validateName } from "../../Service/functions";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { signUp, updateProfile } from "../../Service/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../Store/profileSlice";

const UpdateProfile = () => {
  const profile = useSelector((state) => state.profile);
  const [profileInfo, setProfileInfo] = useState({
    fullName: profile.name ? profile.name : "",
    dateOfBirth: "",
    role: "Attendees",
  });
  const [userYearOld, setUserYearOld] = useState("");
  const [errorRegister, setErrorRegister] = useState({
    fullName: false,
    dateOfBirth: false,
  });
  const [isWaiting, setIsWaiting] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const inputHanlder = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    setProfileInfo((prevValue) => ({ ...prevValue, [type]: value }));
  };
  const inputDateHandler = (value) => {
    if (value !== "") {
      const yearOld = calculateAge(value);
      setUserYearOld(yearOld);
    } else {
      setUserYearOld("");
    }

    setProfileInfo((prevValue) => ({ ...prevValue, dateOfBirth: value }));
  };

  const checkValidInfo = () => {
    let fullName = false;
    let dateOfBirth = false;
    if (!validateName(profileInfo.fullName)) {
      fullName = true;
    }
    if (userYearOld < 16) {
      dateOfBirth = true;
    }
    setErrorRegister({
      fullName,
      dateOfBirth,
    });

    return !(fullName || dateOfBirth);
  };

  const completeProfileHandler = async (event) => {
    event.preventDefault();
    if (checkValidInfo()) {
      let fixedDate = new Date(profileInfo.dateOfBirth);
      fixedDate = new Date(fixedDate.setHours(fixedDate.getHours() + 7));

      try {
        const requestData = {
          name: profileInfo.fullName,
          email: profile.email,
          city: profile.city,
          jobTitle: profile.jobTitle,
          address: profile.address,
          phoneNumber: profile.phoneNumber,
          summary: profile.summary,
          dob: fixedDate.toISOString(),
          role: profileInfo.role,
        };

        setIsWaiting(true);

        const response = await updateProfile(requestData, profile.id);
        if (response.status !== 400 && response.status !== 403) {
          console.log();
          console.log("======================");
          console.log([response.dob, requestData.dob]);
          alert("PAUSE");
          dispatch(
            profileAction.updateProfile({
              ...response,
              avatarURL: "/images/default-avatar.png",
              backgroundURL: "/images/default-cover.jpg",
            })
          );
        }
      } catch (error) {
        setIsWaiting(false);
        console.log(error.response);
      }
    } else {
      setProfileInfo((prevValue) => ({
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
          <button
            className={`${commonStyles.btn} ${commonStyles.btn_danger} ${styles.register__signOut}`}
          >
            Sign out
          </button>
          <div className={`${styles.register__content_detail}`}>
            <div>
              <h1>EVMA</h1>
              <p>Please complete informations bellow</p>
            </div>

            <form
              className={`${commonStyles.form}`}
              onSubmit={completeProfileHandler}
            >
              <div className={`${styles.register__form__group}`}>
                <label htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className={`${commonStyles.form__input}`}
                  value={profileInfo.fullName}
                  onChange={inputHanlder}
                />
                {errorRegister.fullName && (
                  <p className={`${commonStyles.form__error}`}>
                    Full name only have characters (3 - 50)
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
                    value={profileInfo.dateOfBirth}
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
              <label htmlFor="cars">Choose a role:</label>
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
              {!isWaiting && (
                <button
                  type="submit"
                  className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
                >
                  Update Profile
                </button>
              )}
              {isWaiting && (
                <button
                  type="button"
                  className={`${commonStyles.btn} ${commonStyles.btn_wait} ${commonStyles.btn_grey_dark}`}
                >
                  <div className={commonStyles.loader_icon}></div>
                  Update Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
