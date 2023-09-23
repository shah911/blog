import CardList from "@/components/CardList/CardList";
import styles from "./page.module.css";
import Menu from "@/components/Menu/Menu";

interface BlogProps {
  searchParams: {
    cat: string;
  };
}

const Blog: React.FC<BlogProps> = ({ searchParams }) => {
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default Blog;
