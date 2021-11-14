import Backdrop from "./Backdrop";

import styles from "./ConfirmDeletePost.module.scss";
import commonStyles from "../Auth/Auth.module.scss";
import { useState } from "react";

const ConfirmDeletePost = (props) => {
  const [isWaiting, setIsWaiting] = useState(false);

  const onClose = () => {
    props.onClose();
  };

  const onDelete = () => {
    setIsWaiting(true);
    props.onConfirm();
  };
  return (
    <Backdrop>
      <div className={styles.deletePost}>
        <header className={styles.deletePost__header}>
          <h2>Delete the post</h2>
          <img
            src="/images/icon/cancel-icon.png"
            alt="cancel"
            className={`${styles.confirmDelete__cancelIcon}`}
            onClick={onClose}
          />
        </header>
        <div className={styles.deletePost__body}>
          <p>Are you sure to delete the post ?</p>
          <div className={styles.deletePost__buttons}>
            {isWaiting && (
              <>
                <button
                  className={`${commonStyles.btn} ${commonStyles.btn_wait} ${commonStyles.btn_grey_dark}`}
                >
                  Cancel
                </button>
                <button
                  className={`${commonStyles.btn} ${commonStyles.btn_wait} ${commonStyles.btn_grey_dark}`}
                >
                  Delete
                </button>
              </>
            )}
            {!isWaiting && (
              <>
                <button
                  className={`${commonStyles.btn} ${commonStyles.btn_primary_outline}`}
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className={`${commonStyles.btn} ${commonStyles.btn_danger}`}
                  onClick={onDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default ConfirmDeletePost;
