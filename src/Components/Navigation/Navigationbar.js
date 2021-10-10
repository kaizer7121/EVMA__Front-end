import { Link } from "react-router-dom";

import styles from "./Navigationbar.module.scss";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  return (
    <div className={`${styles.navBar}`}>
      <div className={`${styles.navBar__title}`}>
        <Link to="/home">EVMA</Link>
      </div>
      <ul className={`${styles.navBar__items}`}>
        <li className={`${styles.navBar__item}`}>
          <a href="#" className={`${styles.navBar__link}`}>
            Option 1
          </a>
        </li>
        <li className={`${styles.navBar__item}`}>
          <a href="#" className={`${styles.navBar__link}`}>
            Option 2
          </a>
        </li>
        <li className={`${styles.navBar__item}`}>
          <a href="#" className={`${styles.navBar__link}`}>
            Option 3
          </a>
        </li>
      </ul>

      <UserNavigation />
    </div>
  );
};

export default Navbar;
