import styles from "./Header.module.scss";

const DEFAULT_CLAIM = "Dein Tool für themenbezogene Lokalmeldungen 😎";

interface HeaderProps {
  claim?: string;
}

export function Header({ claim = DEFAULT_CLAIM }: HeaderProps) {
  return (
    <header>
      <h1 className={styles.brand}>
        Journo<span className={styles["brand-ai"]}>AI</span>
      </h1>
      <p className={styles.intro}>{claim}</p>
    </header >
  );
}