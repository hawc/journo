
import { Header } from "../components/header/Header";
import { SearchArticles } from "../components/search-articles/SearchArticles";
import { fetchArticles } from "../lib/fetchArticles";
import { Article } from "../types/article";


export default async function App() {
  const articles: Article[] = await fetchArticles();

  return (
    <div className="container">
      <Header />
      <main>
        <SearchArticles articles={articles} />
      </main>
    </div>
  );
}
