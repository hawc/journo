"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useMemo } from "react";
import { Article } from "../../types/article";
import { ArticleList } from "../article-list/ArticleList";

interface BookmarkedArticlesProps {
  articles: Article[];
}

export function BookmarkedArticles({ articles }: BookmarkedArticlesProps) {
  const [bookmarks] = useLocalStorage<string[]>("bookmarks", []);

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
      <ArticleList articles={bookmarkedArticles} />
    </>
  );
}