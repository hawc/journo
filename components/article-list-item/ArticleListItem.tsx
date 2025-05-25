"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Article } from "../../types/article";

import classNames from "classnames";

import { useLocalStorage } from "@uidotdev/usehooks";
import { bookmarkArticle, isBookmarked } from "../../lib/bookmark";
import styles from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  article: Article;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const [bookmarks, setBookmarks] = useLocalStorage<Article[]>("bookmarks", []);

  const handleSetBookmark = useCallback(() => {
    const updatedBookmarks = bookmarkArticle(bookmarks, article);

    setBookmarks(updatedBookmarks);
  }, [bookmarks, article]);

  const isArticleBookmarked = useMemo(() => {
    return isBookmarked(bookmarks, article);
  }, [bookmarks, article]);

  return (
    <div className={styles.wrapper} key={article._id}>
      <div className={styles.header}>
        {article.sourceName} ({new Date(article.date).toLocaleDateString()})
      </div>
      <div className={styles.title}>
        <div className={classNames(styles.bookmark, isArticleBookmarked && styles["is-bookmarked"])}>
          <button
            type="button"
            className={styles["bookmark-button"]}
            onClick={handleSetBookmark}
          >
            {isArticleBookmarked ? <BookmarkCheck /> : <Bookmark />}
          </button>
        </div>
        <a href={article.url} className={styles.headline} target="_blank" rel="noopener noreferrer">{article.headline}</a>
      </div>
      {article.teaser && (
        <div className={styles.teaser}>{article.teaser}</div>
      )}
    </div>
  );
}