import { Article } from "../types/article";

export function isBookmarked(bookmarks: Article[], article: Article) {
  return bookmarks.map(b => b._id).includes(article._id);;
}

export function bookmarkArticle(bookmarks: Article[], article: Article): Article[] {
  if (isBookmarked(bookmarks, article)) {
    return bookmarks.filter((bookmark) => bookmark._id !== article._id);
  } else {
    return [...bookmarks, article];
  }
}
