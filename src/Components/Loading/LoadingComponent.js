import styles from "./LoadingComponent.module.scss";

const LoadingComponent = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingComponent;
