import Backdrop from "./Backdrop";

import styles from "./ConfirmDeletePost.module.scss";
import commonStyles from "../Auth/Auth.module.scss";

const ConfirmDeletePost = (props) => {
  const onClose = () => {
    props.onClose();
  };

  const onDelete = () => {
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
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default ConfirmDeletePost;
