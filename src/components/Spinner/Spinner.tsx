import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.customLoader}></div>
    </div>
  );
}

export default Spinner;
