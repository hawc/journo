import { PropsWithChildren } from "react";

import styles from "./SystemMessage.module.scss";

export function SystemMessage({ children }: PropsWithChildren) {
  return (
    <p className={styles.message}>
      {children}
    </p>
  );
}