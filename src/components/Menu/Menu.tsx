import styles from "./Menu.module.css";
import MenuPost from "../MenuPost/MenuPost";
import { Suspense } from "react";
import Loader from "../Loader/Loader";

function Menu() {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Latest Posts</h1>
      <Suspense fallback={<Loader />}>
        <MenuPost />
      </Suspense>
    </div>
  );
}

export default Menu;
