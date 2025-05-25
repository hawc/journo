import classNames from "classnames";
import { Article } from "../../types/article";
import { ArticleListItem } from "../article-list-item/ArticleListItem";
import { SystemMessage } from "../system-message/SystemMessage";

import { useEffect, useState } from "react";
import styles from "./ArticleList.module.scss";
interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
    }, 20);

    return () => {
      clearTimeout(t);
    };
  }, []);

  if (articles.length === 0) {
    return <SystemMessage>Keine Artikel gefunden</SystemMessage>;
  }

  return (
    <div className={styles.list}>
      {articles.map((article) => (
        <div key={article._id} className={classNames(styles.article, loaded && styles.open)}>
          <ArticleListItem
            article={article}
          />
        </div>
      ))}
    </div>
  );
}