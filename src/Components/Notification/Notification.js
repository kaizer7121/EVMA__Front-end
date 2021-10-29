import { converISOToSimpleDate } from "../../Service/functions";
import styles from "./Notification.module.scss";

const Notification = (props) => {
  return (
    <div className={styles.notification}>
      <div
        className={`${styles.notification__image} ${
          props.information.type === "Organization"
            ? styles.notification__image_avatar
            : ""
        }`}
      >
        <img src={props.information.imgURL} alt="img" />
      </div>
      <div className={styles.notification__detail}>
        <h3>{props.information.message}</h3>
        <p>
          {props.information.date
            ? converISOToSimpleDate(props.information.date)
                .toString()
                .substring(0, 20)
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Notification;
