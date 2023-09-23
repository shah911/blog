"use client";
import Image from "next/image";
import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark"
          ? { border: "1px solid white" }
          : { border: "1px solid black" }
      }
    >
      <Image src="/moon.png" alt="" width={15} height={15} />
      <div
        className={styles.ball}
        style={theme === "dark" ? { right: "1px" } : { left: "1px" }}
      ></div>
      <Image src="/sun.png" alt="" width={15} height={15} />
    </div>
  );
}

export default ThemeToggle;
