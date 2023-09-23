"use client";
import Link from "next/link";
import styles from "./AuthLink.module.css";
import Hamburger from "../Hamburger/HamBurger";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

function AuthLinks() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link className={styles.link} href="/login">
          Login
        </Link>
      ) : (
        <>
          <Link className={styles.link} href="/write">
            Post
          </Link>
          <span
            className={styles.link}
            onClick={() => signOut()}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </>
      )}
      <div className={styles.hamburger} onClick={() => setOpen(!open)}>
        <Hamburger open={open} />
      </div>
      {open && (
        <div className={styles.menu}>
          {status === "unauthenticated" ? (
            <Link onClick={() => setOpen(!open)} href="/login">
              Login
            </Link>
          ) : (
            <>
              <Link onClick={() => setOpen(!open)} href="/write">
                Post
              </Link>
              <span
                onClick={() => {
                  setOpen(!open);
                  signOut();
                }}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </>
          )}
          <Link onClick={() => setOpen(!open)} href="/">
            Home
          </Link>
        </div>
      )}
    </>
  );
}

export default AuthLinks;
