"use client";

import styles from "@/components/navbar/navbar.module.css";
import Image from "next/image";
import logo from "@/../public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menu from "@/../public/menu.svg";

export default function Navbar() {
  const pathname = usePathname().split("/")[1];
  const [scroll, setScroll] = useState(0);
  const [navStyle, setNavstyle] = useState(styles.navbar_dynamic);
  const [checkedMenu, setCheckedMenu] = useState(false);
  const handleScroll = () => {
    if (window.innerWidth > 550) {
      if (scroll >= 120) {
        setScroll(window.scrollY);
        setNavstyle(styles.navbar_static);
      } else {
        setScroll(window.scrollY);
        setNavstyle(styles.navbar_dynamic);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <nav className={navStyle}>
      <div className={styles.logo_menu_wrap}>
        <Link
          href={
            pathname === "article" ? "/article/all-posts" : "/tech/all-posts"
          }
          className={styles.logo}
        >
          <Image className={styles.logo_image} src={logo} alt="logo" />
          <p className={styles.logo_text}>sead post</p>
        </Link>
        <Image
          onClick={() => {
            setCheckedMenu(!checkedMenu);
          }}
          src={menu}
          alt="menu"
          className={styles.menu}
        />
      </div>
      <div
        className={checkedMenu ? styles.button_menu : styles.button_menu_none}
      >
        <Button href="https://sid12g.dev" content="about" />
        <Button href="/tech/all-posts" content="tech" />
        <Button href="/article/all-posts" content="article" />
      </div>
      <div className={styles.button_wrap}>
        <Button href="https://sid12g.dev" content="about" />
        <Button href="/tech/all-posts" content="tech" />
        <Button href="/article/all-posts" content="article" />
      </div>
    </nav>
  );
}

function Button({ href, content }: { href: string; content: string }) {
  const pathname = usePathname().split("/")[1];
  return (
    <Link
      className={content === pathname ? styles.button_selected : styles.button}
      href={href}
    >
      {content}
    </Link>
  );
}
