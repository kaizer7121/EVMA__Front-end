import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { notificationAction } from "../../Store/notificationSlice";
import { profileAction } from "../../Store/profileSlice";
import { tokenAction } from "../../Store/tokenSlice";
import ListNotification from "../Notification/ListNotification";
import styles from "./UserNavigation.module.scss";

const UserNavigation = () => {
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.token.token);
  const instantNotification = useSelector(
    (state) => state.notifications.instantNotifications
  );

  const [isShowOption, setIsShowOption] = useState();
  const [isOpenNotification, setIsOpenNotification] = useState(false);

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
    history.push("/home");
  };

  const OpenNotificationHandler = () => {
    setIsOpenNotification(!isOpenNotification);
    if (!isOpenNotification) {
      dispatch(notificationAction.clearInstantEvent());
    }
  };

  return (
    <>
      {!token && (
        <div className={`${styles.userNav}`}>
          <div className={`${styles.userNav__user}`}>
            <span className={`${styles.userNav__user_sign}`}>
              <Link to="/sign-in">Sign in</Link>
            </span>
          </div>
        </div>
      )}
      {token && (
        <div className={`${styles.userNav}`}>
          <div className={`${styles.userNav__user}`}>
            {profile.role === "Attendees" && (
              <div
                className={`${styles.userNav__iconBox}`}
                onClick={OpenNotificationHandler}
              >
                <img
                  className={`${styles.userNav__icon}`}
                  src="/images/icon/notification.png"
                  alt="Noti"
                />
                {instantNotification.length > 0 && (
                  <span className={`${styles.userNav__notification}`}>
                    {instantNotification.length}
                  </span>
                )}
              </div>
            )}

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
                  <>
                    <Link
                      to="/create"
                      className={`${styles.dropdown__content_createEvent}`}
                    >
                      Create an event
                    </Link>
                    <Link
                      to={`organization/${profile.id}`}
                      className={`${styles.dropdown__content_createEvent}`}
                    >
                      View your page
                    </Link>
                  </>
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
            {isOpenNotification && <ListNotification />}
          </div>
        </div>
      )}
    </>
  );
};

export default UserNavigation;
