import { Link } from "react-router-dom";
import styles from "./SignUp.module.scss";
import commonStyles from "./Auth.module.scss";

const SignUp = () => {
  return (
    <div className={`${styles.register}`}>
      <div className={`${styles.register__box}`}>
        <div className={`${styles.register__poster}`}></div>
        <div className={`${styles.register__content}`}>
          <h1>EVMA</h1>
          <p>
            Already have account ? <Link to="/sign-in">Sign in</Link>
          </p>
          <form className={`${commonStyles.form}`}>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="user-name">User Name</label>
              <input
                type="text"
                id="user-name"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="text"
                id="confirm-password"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <div className={`${styles.register__form__group}`}>
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <button
              type="submit"
              className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
            >
              Create An Account
            </button>
          </form>
          <div className={`${commonStyles.separator}`}>OR</div>
          <button
            type="submit"
            className={`${commonStyles.btn} ${commonStyles.btn_primary_outline}`}
          >
            <img
              src="/images/google-icon.png"
              alt="Google icon"
              className={`${commonStyles.icon}`}
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
