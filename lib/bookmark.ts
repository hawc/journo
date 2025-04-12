import { Article } from "../types/article";

export function bookmarkArticle(article: Article): string[] {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const existingBookmark = bookmarks.find((bookmark: string) => bookmark === article._id);

  if (existingBookmark) {
    const updatedBookmarks = bookmarks.filter((bookmark: string) => bookmark !== article._id);

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  } else {
    bookmarks.push(article._id);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  return getBookmarks();
}

export function getBookmarks(): string[] {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  return bookmarks;
}