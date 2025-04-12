"use client";

import { useMemo } from "react";
import { Article } from "../../types/article";
import { ArticleList } from "../article-list/ArticleList";

interface BookmarkedArticlesProps {
  articles: Article[];
  bookmarks: string[];
  setBookmarks: (bookmarks: string[]) => void;
}

export function BookmarkedArticles({ articles, bookmarks, setBookmarks }: BookmarkedArticlesProps) {
  const bookmarkedArticles = useMemo(() => {
    return articles.filter((article) =>
      bookmarks.includes(article._id)
    );
  }, [articles, bookmarks]);

  if (bookmarkedArticles.length === 0) {
    return;
  }

  return (
    <>
      <hr />
      <h2>Gespeicherte Artikel</h2>
      <ArticleList articles={bookmarkedArticles} bookmarks={bookmarks} setBookmarks={setBookmarks} />
    </>
  );
}