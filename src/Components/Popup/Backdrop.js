import styles from "./Backdrop.module.scss";

const Backdrop = (props) => {
  return <div className={`${styles.confirmImage}`}>{props.children}</div>;
};

export default Backdrop;
