import { Link } from "react-router-dom";

import styles from "./SideNavigation.module.scss";

const SideNavigation = (props) => {
  const activatedItem = props.activatedItem;
  return (
    <nav>
      <ul className={`${styles.sideNav}`}>
        <li
          className={`${styles.sideNav__item} ${activatedItem === "HOME" && styles.sideNav__item__active}`}
        >
          <Link to="/home" className={`${styles.sideNav__link}`}>
            {/* <svg class="side-nav__icon">
              <use xlink:href="img/sprite.svg#icon-home"></use>
            </svg> */}
            <span>All Event</span>
          </Link>
        </li>

        <li className={`${styles.sideNav__item} ${activatedItem === "ORGANIZTAION" && styles.sideNav__item__active}`}>
          <Link
            to="/organizations"
            className={`${styles.sideNav__link}`}
          >
            <span>All Organization</span>
          </Link>
        </li>

        <li className={`${styles.sideNav__item} ${activatedItem === "RECOMMEND" && styles.sideNav__item__active}`}>
          <a href="#" className={`${styles.sideNav__link}`}>
            <span>Recommended event</span>
          </a>
        </li>

        <li className={`${styles.sideNav__item} ${activatedItem === "SEARCH" && styles.sideNav__item__active}` }>
          <a href="#" className={`${styles.sideNav__link}`}>
            <span>Search event</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
