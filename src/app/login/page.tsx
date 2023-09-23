"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useSession, signIn } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import { useEffect } from "react";

function Login() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.socialButton} onClick={() => signIn("google")}>
            Sign in with Google
          </div>
          <div className={styles.socialButton}>Sign in with Github</div>
          <div className={styles.socialButton}>Sign in with Facebook</div>
        </div>
      </div>
    );
  }
}

export default Login;
