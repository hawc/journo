"use client";

import { ChangeEvent, useCallback } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function Input({ value, label, placeholder, disabled, onChange }: InputProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange(newValue);
    },
    [onChange]
  );

  if (label) {
    return (
      <label className={styles.row}>
        <span className={styles.label}>{label}</span>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>
    );
  }

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