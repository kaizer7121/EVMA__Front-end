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
          <Link to="/event" className={`${styles.sideNav__link}`}>
            <span>All Events</span>
          </Link>
        </li>

        <li
          className={`${styles.sideNav__item} ${
            activatedItem === "ORGANIZTAION" && styles.sideNav__item__active
          }`}
        >
          <Link to="/organization" className={`${styles.sideNav__link}`}>
            <span>All Organizations</span>
          </Link>
        </li>

        <li
          className={`${styles.sideNav__item} ${
            activatedItem === "TYPE_3" && styles.sideNav__item__active
          }`}
        >
          {profile.role === "Event Organizer" ? (
            <Link to="/ownEvent" className={`${styles.sideNav__link}`}>
              <span>Own events</span>
            </Link>
          ) : (
            <Link to="/listFollow" className={`${styles.sideNav__link}`}>
              <span>List follows</span>
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
