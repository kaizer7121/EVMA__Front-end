import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { profileAction } from "../../Store/profileSlice";
import { tokenAction } from "../../Store/tokenSlice";
import styles from "./UserNavigation.module.scss";

const UserNavigation = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);

  const [isShowOption, setIsShowOption] = useState();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const clickOutSideDetect = (e) => {
      if (document.getElementById("dropdown"))
        if (!document.getElementById("dropdown").contains(e.target)) {
          setIsShowOption(false);
        }
    };
    if (isShowOption) {
      window.addEventListener("click", clickOutSideDetect);
    } else {
      window.removeEventListener("click", clickOutSideDetect);
    }

    return function cleanup() {
      window.removeEventListener("click", clickOutSideDetect);
    };
  }, [isShowOption]);

  const showOptionHandler = () => {
    setIsShowOption(!isShowOption);
  };

  const selectOptionHandler = () => {
    setIsShowOption(false);
  };

  const onSignOut = () => {
    dispatch(tokenAction.deleteToken());
    dispatch(profileAction.signOut());
    history.push("/sign-in");
  };

  return (
    <>
      {!token && (
        <div className={`${styles.userNav}`}>
          <div className={`${styles.userNav__user}`}>
            <span className={`${styles.userNav__user_sign}`}>
              <Link to="/sign-in">Sign in</Link>
            </span>
            <span className={`${styles.userNav__user_divide}`}>|</span>
            <span className={`${styles.userNav__user_sign}`}>
              <Link to="/sign-up">Sign up</Link>
            </span>
          </div>
        </div>
      )}
      {token && (
        <div className={`${styles.userNav}`}>
          <div className={`${styles.userNav__user}`}>
            <div className={`${styles.userNav__iconBox}`}>
              <img
                className={`${styles.userNav__icon}`}
                src="/images/icon/notification.png"
                alt="Noti"
              />
              <span className={`${styles.userNav__notification}`}>13</span>
            </div>
            <img
              src={profile.avatarURL}
              alt="User avatar"
              className={`${styles.userNav__avatar}`}
            />
            <p className={`${styles.userNav__name}`}>{profile.name}</p>
            <div id="dropdown" className={`${styles.dropdown}`}>
              <label htmlFor="showOption" onClick={showOptionHandler}>
                <img src="/images/icon/Dropdown-icon.png" alt="User avatar" />
              </label>
              <input
                id="showOption"
                type="checkbox"
                className={`${styles.dropdown__button_checkBox}`}
                checked={isShowOption}
              />
              <div
                className={`${styles.dropdown__content}`}
                onClick={selectOptionHandler}
              >
                {profile.role === "Event Organizer" && (
                  <Link
                    to="/create"
                    className={`${styles.dropdown__content_createEvent}`}
                  >
                    Create an event
                  </Link>
                )}

                <Link
                  to="/profile"
                  className={`${styles.dropdown__content_edit}`}
                >
                  Edit your profile
                </Link>
                <p
                  className={`${styles.dropdown__content_logout}`}
                  onClick={onSignOut}
                >
                  Log out
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNavigation;
