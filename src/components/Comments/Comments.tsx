"use client";
import Image from "next/image";
import styles from "./Comments.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loader from "../Loader/Loader";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

type commentType = {
  id: string;
  desc: string;
  createdAt: string;
  user: { name: string; image: string };
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

function Comments({ postSlug }: { postSlug: string }) {
  const { status } = useSession();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `https://blog-git-main-shah911.vercel.app/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    if (!desc || desc.length < 6) {
      setErr(true);
    } else {
      await fetch("https://blog-git-main-shah911.vercel.app/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
      });
      setLoading(true);
      mutate();
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Comments</h3>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment"
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          {loading ? (
            <Spinner />
          ) : (
            <button className={styles.button} onClick={handleSubmit}>
              Comment
            </button>
          )}
          {err && (
            <span>
              Please ensure that your comment consists of at least five to six
              characters
            </span>
          )}
        </div>
      ) : (
        <Link href="/login">Login To Comment</Link>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        data?.map((item: commentType) => (
          <div className={styles.comments} key={item.id}>
            <div className={styles.comment}>
              {item?.user?.image && (
                <Image
                  src={item.user.image}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.img}
                />
              )}
              <div className={styles.details}>
                <span className={styles.username}>{item.user.name}</span>
                <span className={styles.date}>
                  {item.createdAt.slice(0, 10)}
                </span>
              </div>
            </div>
            <p>{item.desc}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;
