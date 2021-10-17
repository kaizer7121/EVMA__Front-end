import { useSelector } from "react-redux";
import styles from "./ListNotification.module.scss";
import Notification from "./Notification";

const ListNotification = () => {
  const listNotification = useSelector(
    (state) => state.notifications.notifications
  );

  return (
    <div className={styles.listNotification}>
      <h1>Notifications</h1>
      {listNotification.length === 0 && <p>You don't have any notification</p>}
      {listNotification.length > 0 &&
        listNotification.map((notification, index) => (
          <Notification
            key={`NOTIFICATION_${index}`}
            information={notification}
          />
        ))}
    </div>
  );
};

export default ListNotification;
