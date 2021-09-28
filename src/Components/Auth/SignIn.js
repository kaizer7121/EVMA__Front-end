import { Link } from "react-router-dom";
import styles from "./SignIn.module.scss";
import commonStyles from "./Auth.module.scss";

const SignIn = () => {
  return (
    <div className={`${styles.login}`}>
      <div className={`${styles.login__box}`}>
        <div className={`${styles.login__poster}`}></div>
        <div className={`${styles.login__content}`}>
          <h1>EVMA</h1>
          <h3>Welcome back to EVMA</h3>
          <p>
            First time ? <Link to="/sign-up">Create an account</Link>
          </p>
          <form className={`${commonStyles.form}`}>
            <div className={`${styles.login__form__group}`}>
              <label htmlFor="user-name">User Name</label>
              <input
                type="text"
                id="user-name"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <div className={`${styles.login__form__group}`}>
              <label htmlFor="password">
                Password <Link to="/forgot-password">Forgot password ?</Link>
              </label>
              <input
                type="text"
                id="password"
                className={`${commonStyles.form__input}`}
              />
            </div>
            <div className={`${styles.login__form__checkbox}`}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <button
              type="submit"
              className={`${commonStyles.btn} ${commonStyles.btn_primary}`}
            >
              Sign In
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

export default SignIn;
