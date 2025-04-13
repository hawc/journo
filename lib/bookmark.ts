import { Article } from "../types/article";

export function bookmarkArticle(bookmarks: string[], article: Article): string[] {
  if (bookmarks.includes(article._id)) {
    return bookmarks.filter((id) => id !== article._id);
  } else {
    return [...bookmarks, article._id];
  }
}
