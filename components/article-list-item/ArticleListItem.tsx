"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useCallback } from "react";
import { Article } from "../../types/article";

import classNames from "classnames";

import { useLocalStorage } from "@uidotdev/usehooks";
import { bookmarkArticle } from "../../lib/bookmark";
import styles from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  article: Article;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);

  const isBookmarked = bookmarks.includes(article._id);

  const handleSetBookmark = useCallback(() => {
    const updatedBookmarks = bookmarkArticle(bookmarks, article);

    setBookmarks(updatedBookmarks);
  }, [article]);

  return (
    <div className={styles.wrapper} key={article._id}>
      <div className={styles.header}>
        <small>{article.sourceName} ({new Date(article.date).toLocaleDateString()})</small>
      </div>
      <div className={styles.title}>
        <div className={classNames(styles.bookmark, isBookmarked && styles["is-bookmarked"])}>
          <button
            type="button"
            className={styles["bookmark-button"]}
            onClick={handleSetBookmark}
          >
            {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
          </button>
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer">{article.headline}</a>
      </div>
      {article.teaser && (
        <div>
          <small>{article.teaser}</small>
        </div>
      )}
    </div>
  );
}