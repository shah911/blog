import React, { Suspense } from "react";
import Featured from "@/components/Featured/Featured";
import styles from "./page.module.css";
import Category from "@/components/CategoryList/Category";
import CardList from "@/components/CardList/CardList";
import Menu from "@/components/Menu/Menu";
import Loader from "@/components/Loader/Loader";

interface HomeProps {
  searchParams: {
    cat: string;
  };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const { cat } = searchParams;
  return (
    <div>
      <Featured />
      <Suspense fallback={<Loader />}>
        <Category />
      </Suspense>
      <div className={styles.content}>
        <Suspense fallback={<Loader />}>
          <CardList cat={cat} />
        </Suspense>
        <Menu />
      </div>
    </div>
  );
};

export default Home;
