import styles from "./InitEvent.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { getDate } from "../Service/Functions";

const InitEvent = (props) => {
  const descriptionArr = props.information.description.split("\n");
  const date = getDate(props.information.date);
  
  return (
    <section className={`${styles.detail}`}>
      <header className={`${styles.detail__header}`}>
        <div className={`${styles.detail__poster}`}>
          {props.information.image && (
            <img src={props.information.image} alt="Poster" />
          )}
        </div>
        <div className={`${styles.detail__register}`}>
          <h3 className={`${styles.detail__topic}`}>Date:</h3>
          <p className={`${styles.detail__registerText}`}>
            {date}, {props.information.time}
          </p>
          <h3 className={`${styles.detail__topic}`}>Location:</h3>
          <p className={`${styles.detail__registerText}`}>
            {props.information.location}
          </p>
          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Categories:
          </h3>
          {props.information.categories.map((category) => (
            <p className={`${styles.detail__category}`}>{category}</p>
          ))}
          <h3 className={`${styles.detail__topic}`}>Organization:</h3>
          <p className={`${styles.detail__registerText}`}>
            {props.information.organization}
          </p>
          <button
            className={`${commonStyles.btn} ${commonStyles.btn_primary_light} ${styles.btn_small}`}
          >
            Join
          </button>
        </div>
      </header>
      <hr />
      <div className={`${styles.detail__body}`}>
        <h1 className={`${styles.detail__title}`}>{props.information.title}</h1>
        {descriptionArr.map((sentence) => (
          <p className={`${styles.detail__description}`}>{sentence}</p>
        ))}
      </div>
    </section>
  );
};

export default InitEvent;
