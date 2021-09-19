import {Link} from "react-router-dom";

import styles from "./SideNavigation.module.scss";

const SideNavigation = () => {
  return (
    <nav>
      <ul className={`${styles.sideNav}`}>
        <li
          className={`${styles.sideNav__item} ${styles.sideNav__item__active}`}
        >
          <a href="#" className={`${styles.sideNav__link}`}>
            {/* <svg class="side-nav__icon">
              <use xlink:href="img/sprite.svg#icon-home"></use>
            </svg> */}
            <span>All Event</span>
          </a>
        </li>

        <li className={`${styles.sideNav__item}`}>
          <a href="#" className={`${styles.sideNav__link}`}>
            {/* <svg class="side-nav__icon">
              <use xlink:href="img/sprite.svg#icon-aircraft-take-off"></use>
            </svg> */}
            <span>All Organization</span>
          </a>
        </li>

        <li className={`${styles.sideNav__item}`}>
          <a href="#" className={`${styles.sideNav__link}`}>
            {/* <svg class="side-nav__icon">
              <use xlink:href="img/sprite.svg#icon-key"></use>
            </svg> */}
            <span>Recommended event</span>
          </a>
        </li>

        <li className={`${styles.sideNav__item}`}>
          <a href="#" className={`${styles.sideNav__link}`}>
            {/* <svg class="side-nav__icon">
              <use xlink:href="img/sprite.svg#icon-map"></use>
            </svg> */}
            <span>Search event</span>
          </a>
        </li>
      </ul>

    </nav>
  );
};

export default SideNavigation;
