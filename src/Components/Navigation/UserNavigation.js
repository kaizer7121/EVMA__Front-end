import styles from "./UserNavigation.module.scss";

const UserNavigation = () => {
  return (
    <div className={`${styles.userNav}`}>
      <div className={`${styles.userNav__user}`}>
        <img
          src="/avatar.jpg"
          alt="User avatar"
          className={`${styles.userNav__avatar}`}
        />
        <p className={`${styles.userNav__name}`}>Hữu Đức</p>
        <div className={`${styles.dropdown}`}>
          <div className={`${styles.dropdown__button}`}>
            <img src="/icon/Dropdown-icon.png" alt="User avatar" />
          </div>
          <div className={`${styles.dropdown__content}`}>
            <a href="#" className={`${styles.dropdown__content_createEvent}`}>
              Create an event
            </a>
            <a href="# " className={`${styles.dropdown__content_edit}`}>
              Edit your profile
            </a>
            <a href="#" className={`${styles.dropdown__content_logout}`}>
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavigation;
