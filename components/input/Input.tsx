"use client";

import { ChangeEvent, useCallback } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function Input({ value, placeholder, disabled, onChange }: InputProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={handleChange}
    />
  );
}