import { ConfigSection } from "../../components/config-section/ConfigSection";
import { Header } from "../../components/header/Header";
import { fetchConfigs } from "../../lib/fetchConfigs";

import styles from "./Manage.module.scss";

export default async function Manage() {
  const configs = await fetchConfigs();

  return (
    <div data-page className="container">
      <Header claim="Manage" />
      <main>
        <div className={styles.configs}>
          {configs.map(config => (
            <ConfigSection key={config._id} config={config} />
          ))}
        </div>
      </main>
    </div>
  );
}
