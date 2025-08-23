import Link from "next/link";

import { SystemMessage } from "../system-message/SystemMessage";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <>
      <div className={styles.info}>
        <SystemMessage>Du findest nicht, wonach du suchst? <strong>Journo</strong> befindet sich gerade im Testmodus und liefert daher noch keine perfekten Ergebnisse. Komm gern später noch mal wieder.</SystemMessage>
        </div>
      <footer className={styles.footer}>
          <Link href="https://github.com/hawc/journo" target="_blank">GitHub</Link>
          <Link href="https://hendrikwichern.de/imprint" target="_blank">Impressum</Link>
      </footer>
    </>
  );
}