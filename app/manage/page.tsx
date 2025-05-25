import { ConfigSection } from "../../components/config-section/ConfigSection";
import { Header } from "../../components/header/Header";
import { auth0 } from "../../lib/auth0";
import { fetchConfigs } from "../../lib/fetchConfigs";

import styles from "./Manage.module.scss";

export default async function Manage() {
  const configs = await fetchConfigs();
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

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
