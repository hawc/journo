
import { SearchArticles } from "../components/search-articles/SearchArticles";
import { fetchArticles } from "../lib/fetchArticles";
import { Article } from "../types/article";


export default async function App() {
  const articles: Article[] = await fetchArticles();

  return (
    <div className="container">
      <header>
        <h1 className="brand">Journo<span className="brand-ai">AI</span></h1>
        <p className="intro">Dein Tool für themenbezogene Lokalmeldungen 😎</p>
      </header>
      <main>
        <SearchArticles articles={articles} />
      </main>
    </div>
  );
}
