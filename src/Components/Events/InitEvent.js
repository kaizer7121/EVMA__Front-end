import styles from "./InitEvent.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { getDate, validURL } from "../Service/functions";

const InitEvent = (props) => {
  const eventType = validURL(props.information.location) ? "Online" : "Offline";
  const descriptionArr = props.information.content.split("\n");
  const startDate = getDate(props.information.startDate);
  const endDate = getDate(props.information.endDate);
  console.log(eventType);
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
            {startDate}, {props.information.startTime}
            {endDate.length > 0 &&
              ` - ${endDate}, ${props.information.endTime}`}
          </p>
          <h3 className={`${styles.detail__topic}`}>
            {eventType === "Online" ? "URL" : "Location"}
          </h3>
          {eventType === "Online" ? (
            <a
              href={props.information.location}
              className={`${styles.detail__registerText}`}
            >
              <p>Link to join the event</p>
            </a>
          ) : (
            <p className={`${styles.detail__registerText}`}>
              {props.information.location}
            </p>
          )}

          <h3 className={`${styles.detail__topic} ${styles.mb_small}`}>
            Categories:
          </h3>
          {props.information.categories.map((category) => (
            <p className={`${styles.detail__category}`}>{category}</p>
          ))}
          <h3 className={`${styles.detail__topic}`}>Organization:</h3>
          <p className={`${styles.detail__registerText}`}>
            {props.information.organization}
            {props.information.otherOrganizations &&
              props.information.otherOrganizations.trim().length > 0 &&
              `, ${props.information.otherOrganizations}`}
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
