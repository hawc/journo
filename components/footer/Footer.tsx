import Link from "next/link";

import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href="https://hendrikwichern.de/imprint" target="_blank">Impressum</Link>
      </div>
    </footer>
  );
}