"use client";

import { Loader, Send } from "lucide-react";

import styles from "./SubmitButton.module.scss";

interface SubmitButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
}

export function SubmitButton({ disabled, isLoading }: SubmitButtonProps) {
  return (
    <button disabled={disabled} type="submit">
      {isLoading ? (
        <Loader className={styles["animate-spin"]} />
      ) : (
        <Send />
      )}
    </button>
  );
}