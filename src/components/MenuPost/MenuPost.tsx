import Link from "next/link";
import styles from "./MenuPost.module.css";
import Image from "next/image";

type postType = {
  id: string;
  img: string;
  title: string;
  user: { name: string };
  createdAt: string;
  catSlug: string;
};

const url = process.env.NEXTAUTH_URL!;

const getData = async () => {
  const res = await fetch(`${url}/api/posts?latest=true`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to get the posts");
  }
  return res.json();
};

async function MenuPost() {
  const { Posts } = await getData();
  return (
    <div className={styles.items}>
      {Posts?.map(
        (item: postType) => (
          //item.img && (
          <Link
            href={`/posts/${item.id}`}
            className={styles.item}
            key={item.id}
          >
            {item.img && (
              <div className={styles.imgContainer}>
                <Image src={item.img} alt="" fill className={styles.img} />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles[item.catSlug]}`}>
                {item.catSlug}
              </span>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <div className={styles.details}>
                <span className={styles.username}>{item.user?.name}</span>
                <span className={styles.date}>
                  {" "}
                  - {item.createdAt.slice(0, 10)}
                </span>
              </div>
            </div>
          </Link>
        )
        //)
      )}
    </div>
  );
}

export default MenuPost;
