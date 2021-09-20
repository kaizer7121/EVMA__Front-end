import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import commonStyles from "./Auth.module.scss";

const ForgotPassword = () => {
  return (
    <div className={`${styles.reset}`}>
      <div className={`${styles.reset__box}`}>
        <div className={`${styles.reset__poster}`}></div>
        <div className={`${styles.reset__content}`}>
          <button className={`${commonStyles.btn} ${commonStyles.btn_primary} ${styles.reset__back}`}>
            <Link to="/sign-in">Turn back</Link>
          </button>
          <h1>EVMA</h1>
          <h3>Reset your password</h3>
          <form className={`${commonStyles.form}`}>
            <div className={`${styles.reset__form__group}`}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className={`${commonStyles.form__input}`}
              />
            </div>

            <button
              type="submit"
              className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
