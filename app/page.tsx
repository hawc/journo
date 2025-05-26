
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SearchArticles } from "../components/search-articles/SearchArticles";

import styles from "./App.module.scss";

export default async function App() {
  return (
    <div data-page className={styles.container}>
      <Header />
      <main className={styles.main}>
        <SearchArticles />
      </main>
      <Footer />
    </div>
  );
}
