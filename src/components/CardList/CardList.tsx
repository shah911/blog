"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CardList.module.css";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";

type PostType = {
  id: string;
  title: string;
  img: string;
  desc: string;
  createdAt: string;
  slug: string;
};
//https://blog-d4vpwiudu-shah911.vercel.app

const getData = async (page: number, cat: string) => {
  const res = await fetch(
    `https://blog-git-main-shah911.vercel.app/api/posts?page=${page}&cat=${
      cat || ""
    }`
  );
  if (!res.ok) {
    throw new Error("Failed to get the posts");
  }
  return res.json();
};

function CardList({ cat }: { cat: string }) {
  const [Posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // Create an observer instance
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current && !allPostsLoaded) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [allPostsLoaded]);

  useEffect(() => {
    setLoading(true);
    const loadPosts = async () => {
      const data = await getData(page, cat);
      setPosts((prevPosts) => [...prevPosts, ...data.Posts]);
      setLoading(false);

      // Check if all posts have been loaded
      if (data.Posts.length === 0) {
        setAllPostsLoaded(true);
      }
    };

    // Only load posts if not all posts have been loaded
    if (!allPostsLoaded) {
      loadPosts();
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts</h1>
      <div className={styles.posts}>
        {Posts?.map((item: PostType) => (
          <Card item={item} key={item.id} />
        ))}
        {loading && <Spinner />}
        <div ref={loader} />
      </div>
    </div>
  );
}

export default CardList;
