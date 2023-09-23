import React from "react";
import styles from "./Hamburger.module.css";

type HamburgerProps = {
  open: boolean;
};

export default function Hamburger({ open }: HamburgerProps) {
  const handleHamburgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div>
      <input
        type="checkbox"
        id={styles.checkbox}
        className={styles.hidden}
        checked={open}
        readOnly
      />
      <label
        htmlFor={styles.checkbox}
        className={styles.toggle}
        onClick={handleHamburgerClick}
      >
        <div className={styles.bars} id={styles.bar1}></div>
        <div className={styles.bars} id={styles.bar2}></div>
        <div className={styles.bars} id={styles.bar3}></div>
      </label>
    </div>
  );
}
