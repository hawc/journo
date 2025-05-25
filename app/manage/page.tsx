import { ConfigSection } from "../../components/config-section/ConfigSection";
import { Header } from "../../components/header/Header";
import { auth0 } from "../../lib/auth0";
import { fetchConfigs } from "../../lib/fetchConfigs";

import styles from "./Manage.module.scss";

export default async function Manage() {
  const configs = await fetchConfigs();
  const session = await auth0.getSession();

  const content =
    configs.map(config => (
      <ConfigSection key={config._id} config={config} />
    ));

  return (
    <div data-page className="container">
      <Header claim="Manage">
        {session && (
          <a href="/auth/logout">Log out</a>
        )}
      </Header>
      <main>
        <div className={styles.content}>
          {session ? (
            <div className={styles.configs}>
              {content}
            </div>
          ) : (
            <div className={styles.login}>
              <p>You need to be logged in to manage your configs.</p>
              <a href="/auth/login">Log in</a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
