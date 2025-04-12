"use client";

import { useCallback } from "react";
import { bookmarkArticle } from "../../lib/bookmark";
import { Article } from "../../types/article";
import { ArticleListItem } from "../article-list-item/ArticleListItem";

interface ArticleListProps {
  articles: Article[];
  bookmarks: string[];
  setBookmarks: (bookmarks: string[]) => void;
}

export function ArticleList({ articles, bookmarks, setBookmarks }: ArticleListProps) {
  const setBookmark = useCallback((article: Article) => {
    const updatedBookmarks = bookmarkArticle(article);
    setBookmarks(updatedBookmarks);
  }, []);

  if (articles.length === 0) {
    return <p className="warning">Keine Artikel gefunden</p>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticleListItem
          key={article._id}
          article={article}
          bookmarks={bookmarks}
          setBookmark={setBookmark}
        />
      ))}
    </>
  );
}