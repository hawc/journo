import { PropsWithChildren } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
}

export function Button({ children, onClick }: PropsWithChildren<ButtonProps>) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}