import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import AuthLinks from "../AuthLinks/AuthLinks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt="facebook" width={25} height={25} />
        <Image src="/instagram.png" alt="instagram" width={25} height={25} />
        <Image src="/youtube.png" alt="youtube" width={25} height={25} />
      </div>
      <div className={styles.logo}>Shah.</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link className={styles.link} href="/">
          Home
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
}

export default Navbar;
