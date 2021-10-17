import styles from "./Notification.module.scss";

const Notification = (props) => {
  return (
    <div className={styles.notification}>
      <div className={styles.notification__image}>
        <img src={props.information.imgURL} alt="img" />
      </div>
      <div className={styles.notification__detail}>
        <h3>{props.information.message}</h3>
        <p>{props.information.date}</p>
      </div>
    </div>
  );
};

export default Notification;
