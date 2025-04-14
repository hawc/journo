"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { Article } from "../../types/article";
import { ArticleList } from "../article-list/ArticleList";

import { Share } from "lucide-react";
import { useCallback } from "react";
import { shareBookmarks } from "../../lib/shareBookmarks";
import styles from "./BookmarkedArticles.module.scss";

export function BookmarkedArticles() {
  const [bookmarks] = useLocalStorage<Article[]>("bookmarks", []);

  const handleShare = useCallback(() => {
    shareBookmarks();
  }, []);


  if (bookmarks.length === 0) {
    return;
  }

  return (
    <>
      <div className={styles.bookmarks}>
        <div className={styles.header}>
          <h2>Gespeicherte Artikel</h2>
          <button className={styles.button} type="button" onClick={handleShare}><Share /></button>
        </div>
      </div>
      <ArticleList articles={bookmarks} />
    </>
  );
}