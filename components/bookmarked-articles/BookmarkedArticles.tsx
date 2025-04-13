"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { Article } from "../../types/article";
import { ArticleList } from "../article-list/ArticleList";

import styles from "./BookmarkedArticles.module.scss";

export function BookmarkedArticles() {
  const [bookmarks] = useLocalStorage<Article[]>("bookmarks", []);

  if (bookmarks.length === 0) {
    return;
  }

  return (
    <>
      <div className={styles.bookmarks}>
        <h2>Gespeicherte Artikel</h2>
      </div>
      <ArticleList articles={bookmarks} />
    </>
  );
}