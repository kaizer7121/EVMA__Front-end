import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./SideNavigation.module.scss";

const SideNavigation = (props) => {
  const profile = useSelector((state) => state.profile);
  const activatedItem = props.activatedItem;
  return (
    <nav>
      <ul className={`${styles.sideNav}`}>
        <li
          className={`${styles.sideNav__item} ${
            activatedItem === "HOME" && styles.sideNav__item__active
          }`}
        >
          <Link to="/home" className={`${styles.sideNav__link}`}>
            {/* <svg class="side-nav__icon">
              <use xlink:href="img/sprite.svg#icon-home"></use>
            </svg> */}
            <span>All Event</span>
          </Link>
        </li>

        <li
          className={`${styles.sideNav__item} ${
            activatedItem === "ORGANIZTAION" && styles.sideNav__item__active
          }`}
        >
          <Link to="/organization" className={`${styles.sideNav__link}`}>
            <span>All Organization</span>
          </Link>
        </li>

        <li
          className={`${styles.sideNav__item} ${
            activatedItem === "RECOMMEND" && styles.sideNav__item__active
          }`}
        >
          {profile.role === "Event Organizer" ? (
            <Link to="/event" className={`${styles.sideNav__link}`}>
              <span>Own event</span>
            </Link>
          ) : (
            <Link to="/event" className={`${styles.sideNav__link}`}>
              <span>Followed event</span>
            </Link>
          )}
        </li>

        <li
          className={`${styles.sideNav__item} ${
            activatedItem === "SEARCH" && styles.sideNav__item__active
          }`}
        >
          <Link to="/search" className={`${styles.sideNav__link}`}>
            <span>Search</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
