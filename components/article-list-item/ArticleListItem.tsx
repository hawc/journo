"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useCallback } from "react";
import { Article } from "../../types/article";

interface ArticleListItemProps {
  article: Article;
  bookmarks: string[];
  setBookmark: (article: Article) => void;
}

export function ArticleListItem({ article, bookmarks, setBookmark }: ArticleListItemProps) {
  const isBookmarked = bookmarks.includes(article._id);

  const handleSetBookmark = useCallback(() => {
    setBookmark(article);
  }, [article]);

  return (
    <div className="article-wrapper" key={article._id}>
      <div className="article-header">
        <small>{article.sourceName} ({new Date(article.date).toLocaleDateString()})</small>
      </div>
      <div className="article-title">
        <div className={isBookmarked ? "article-bookmark is-bookmarked" : "article-bookmark"}>
          <button
            type="button"
            className="bookmark-button"
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