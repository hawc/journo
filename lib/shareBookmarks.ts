import { Article } from "../types/article";

export function shareBookmarks() {
  const raw = localStorage.getItem('bookmarks');
  if (!raw) {
    console.log('No bookmarks found.');
    return;
  }

  let articles: Article[];

  try {
    articles = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse bookmarks from localStorage:', e);
    return;
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    console.log('No bookmarks to share.');
    return;
  }

  const shareText = articles.map(article => {
    return `📰 ${article.headline}\n🔗 ${article.url}`;
  }).join('\n\n');

  if (navigator.share) {
    navigator.share({
      text: shareText,
    }).catch(err => {
      console.error('Sharing failed:', err);
    });
  } else {
    console.log('Your browser doesn’t support native sharing.');
  }
}