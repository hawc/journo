"use client";

import { MouseEvent, PropsWithChildren, useCallback } from "react";
import styles from "./Header.module.scss";

const DEFAULT_CLAIM = "Dein Tool für themenbezogene Lokalmeldungen 😎";

interface HeaderProps {
  claim?: string;
}

export function Header({ claim = DEFAULT_CLAIM, children }: PropsWithChildren<HeaderProps>) {
  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    const main = document.querySelector("[data-page]");
    main!.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = "/";
    }, 400); // match CSS transition duration
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.brand}>
        <a className={styles.link} href="/" onClick={handleClick}>Journo<span className={styles["brand-ai"]}>AI</span></a>
      </h1>
      <p className={styles.intro}>{claim}</p>
      <p>
        {children}
      </p>
    </header>
  );
}