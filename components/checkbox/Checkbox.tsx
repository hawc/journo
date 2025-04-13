import { ChangeEvent, useCallback } from "react";

import classNames from "classnames";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  label: string;
  value: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ label, value, disabled, onChange }: CheckboxProps) {
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  }, []);

  return (
    <label className={classNames(styles.wrapper, disabled && styles.disabled)}>
      <input className={styles.checkbox} disabled={disabled} defaultChecked={value} type="checkbox" onChange={handleChange} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

