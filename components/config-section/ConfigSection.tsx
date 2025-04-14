"use client";

import { useCallback, useState } from "react";
import { Config, Framework } from "../../types/config";
import { Input } from "../input/Input";

import { Button } from "../button/Button";
import styles from "./ConfigSection.module.scss";

interface ConfigSectionProps {
  config: Config;
}

export function ConfigSection({ config }: ConfigSectionProps) {
  const [configValue, setConfigValue] = useState(config);

  const handleFrameworkChange = useCallback((value: string) => {
    setConfigValue({
      ...configValue,
      framework: value as Framework,
    });
  }, [configValue, setConfigValue]);

  const handleLocationChange = useCallback((value: string) => {
    setConfigValue({
      ...configValue,
      location: value,
    });
  }, [configValue, setConfigValue]);

  const handleNameChange = useCallback((value: string) => {
    setConfigValue({
      ...configValue,
      name: value,
    });
  }, [configValue, setConfigValue]);

  const handleUrlChange = useCallback((value: string) => {
    setConfigValue({
      ...configValue,
      url: value,
    });
  }, [configValue, setConfigValue]);

  const handleSubmit = useCallback(async () => {
    await fetch("/api/updateConfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ config: configValue }),
    });
  }, [configValue]);

  return (
    <div className={styles.section}>
      <Input label="Name" value={configValue.name} onChange={handleNameChange} />
      <Input label="URL" value={configValue.url} onChange={handleUrlChange} />
      <Input label="Location" value={configValue.location} onChange={handleLocationChange} />
      <Input label="Framework" value={configValue.framework} onChange={handleFrameworkChange} />
      <div className={styles.button}>
        <Button onClick={handleSubmit}>Speichern</Button>
      </div>
    </div>
  );
}