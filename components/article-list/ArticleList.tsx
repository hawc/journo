import { Article } from "../../types/article";
import { ArticleListItem } from "../article-list-item/ArticleListItem";
import { SystemMessage } from "../system-message/SystemMessage";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return <SystemMessage>Keine Artikel gefunden</SystemMessage>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticleListItem
          key={article._id}
          article={article}
        />
      ))}
    </>
  );
}