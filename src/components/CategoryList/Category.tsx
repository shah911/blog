import Image from "next/image";
import styles from "./CategoryList.module.css";
import Link from "next/link";

type DataType = {
  id: number;
  img: string;
  slug: string;
  title: string;
};

const getData = async () => {
  const res = await fetch(
    "https://nextblog-r9tmzoy1q-shah911.vercel.app/api/categories",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to get the Categoires");
  }
  return res.json();
};

async function Category() {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item: DataType) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            key={item.id}
            className={`${styles.category} ${styles[item.slug]}`}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={30}
                height={30}
                className={styles.img}
              />
            )}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
