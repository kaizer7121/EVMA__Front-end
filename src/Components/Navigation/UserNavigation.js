import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserNavigation.module.scss";

const UserNavigation = () => {
  const [isShowOption, setIsShowOption] = useState();

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

  return (
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
          src="/avatar.jpg"
          alt="User avatar"
          className={`${styles.userNav__avatar}`}
        />
        <p className={`${styles.userNav__name}`}>Đào Hữu Đức</p>
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
            <Link
              to="/create"
              className={`${styles.dropdown__content_createEvent}`}
            >
              Create an event
            </Link>
            <Link to="/profile" className={`${styles.dropdown__content_edit}`}>
              Edit your profile
            </Link>
            <Link
              to="/sign-in"
              className={`${styles.dropdown__content_logout}`}
            >
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavigation;
