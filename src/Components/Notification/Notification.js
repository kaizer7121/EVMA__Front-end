import { useHistory } from "react-router";
import { converISOToSimpleDate } from "../../Service/functions";
import styles from "./Notification.module.scss";

const Notification = (props) => {
  const history = useHistory();

  const onClickNotification = (type, id) => {
    if (type === "Organization") {
      history.push(`/organization/${id}`);
    } else if (type === "Event") {
      history.push(`/event/${id}`);
    }
  };

  return (
    <div
      className={styles.notification}
      onClick={() => {
        onClickNotification(
          props.information.type,
          props.information.notificationID
        );
      }}
    >
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
