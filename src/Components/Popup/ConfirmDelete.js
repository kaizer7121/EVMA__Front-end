import { useState } from "react";
import styles from "./ConfirmDelete.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import Backdrop from "./Backdrop";

const ConfirmDelete = (props) => {
  const [selectedOption, setSelectedOption] = useState("Cancel");

  const chooseOption = (type) => {
    setSelectedOption(type);
  };

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onConfirm(selectedOption);
  };

  return (
    <Backdrop>
      <div className={styles.confirmDelete}>
        <div className={styles.confirmDelete__header}>
          <h1>Delete or cancel the event</h1>
          <img
            src="/images/icon/cancel-icon.png"
            alt="cancel"
            className={`${styles.confirmDelete__cancelIcon}`}
            onClick={onClose}
          />
        </div>
        <div className={styles.confirmDelete__body}>
          <div className={styles.confirmDelete__body_select}>
            <label htmlFor="cancelEvent">Cancel event</label>
            <input
              id="cancelEvent"
              type="radio"
              checked={selectedOption === "Cancel"}
              onChange={() => {
                chooseOption("Cancel");
              }}
            />
            <p>
              When you cancel the event, all followers will recieve the
              notification and you cannot modify or delete this event anymore.
            </p>
          </div>
          <div className={styles.confirmDelete__body_select}>
            <label htmlFor="deleteEvent">Delete event</label>
            <input
              id="deleteEvent"
              type="radio"
              checked={selectedOption === "Delete"}
              onChange={() => {
                chooseOption("Delete");
              }}
            />
            <p>
              When you delete the event, all followers will receive the
              notification, you cannot modify this event anymore.
            </p>
          </div>
        </div>
        <div className={`${styles.confirmDelete__button}`}>
          <button
            className={`${commonStyles.btn} ${commonStyles.btn_danger}`}
            onClick={onSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default ConfirmDelete;
