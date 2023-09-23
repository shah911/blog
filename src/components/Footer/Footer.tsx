import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.logo}>Shah.</h1>
        <p className={styles.desc}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={20} height={20} />
          <Image src="/instagram.png" alt="" width={20} height={20} />
          <Image src="/youtube.png" alt="" width={20} height={20} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">travel</Link>
          <Link href="/about">coding</Link>
          <Link href="/blog">Design</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/about">Instagram</Link>
          <Link href="/blog">LinkedIn</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
