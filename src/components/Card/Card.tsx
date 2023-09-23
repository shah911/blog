"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Link from "next/link";

type PostType = {
  id: string;
  title: string;
  img: string;
  desc: string;
  createdAt: string;
  slug: string;
};

function Card({ item }: { item: PostType }) {
  const [sanitizedDesc, setSanitizedDesc] = useState<string>("");

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = item.desc;
    const sanitizedHTML = tempDiv.textContent || tempDiv.innerText;
    setSanitizedDesc(sanitizedHTML);
  }, [item.desc]);

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        {item.img && (
          <div className={styles.imgContainer}>
            <Image src={item.img} alt="" fill className={styles.img} />
          </div>
        )}
        <div className={styles.textContainer}>
          <div className={styles.details}>
            <span className={styles.date}>
              {item.createdAt.slice(0, 10)} -{" "}
            </span>
            <span className={styles.category}>{item.slug.toUpperCase()}</span>
          </div>
          <h1 className={styles.postTitle}>{item.title}</h1>
          {/* Sanitized HTML content */}
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: sanitizedDesc.substring(0, 100) + "...",
            }}
          />

          <Link className={styles.link} href={`/posts/${item.id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
