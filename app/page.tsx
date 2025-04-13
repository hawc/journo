
import { Header } from "../components/header/Header";
import { SearchArticles } from "../components/search-articles/SearchArticles";


export default async function App() {
  return (
    <div data-page className="container">
      <Header />
      <main>
        <SearchArticles />
      </main>
    </div>
  );
}
