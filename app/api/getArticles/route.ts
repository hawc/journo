import { createHash } from 'crypto';
import { fetchArticles } from "../../../lib/fetchArticles";
import { fetchNewsApi, NewsApiArticle } from "../../../lib/fetchNewsApi";
import { getMatchingArticles } from "../../../lib/openAi";
import { Article } from "../../../types/article";

function hashString(string: string) {
  return createHash('md5').update(string).digest('hex');
}

function removeDuplicates(articles: Article[]) {
  return articles.filter((item, index, self) => {
    const id = item._id;

    return (
      self.findIndex((t) => t._id === id) === index
    );
  });
}

function sortByDate(articles: Article[]) {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userPrompt, includeNews } = body;

  const articles = await fetchArticles();

  const newsArticles = includeNews ? await fetchNewsApi(userPrompt) : [];

  const transformedNewsArticles: Article[] = removeDuplicates(newsArticles.map((item: NewsApiArticle) => ({
    _id: hashString(item.title),
    sourceName: item.source.name,
    sourceUrl: "",
    headline: item.title,
    teaser: item.description,
    content: item.content,
    url: item.url,
    date: item.publishedAt
  } as Article)));

  const allArticles = [...articles, ...transformedNewsArticles];

  const articleHeadlines = allArticles.map((article: Article) => {
    return { _id: article._id, headline: article.headline };
  });

  const matchingArticleIds = await getMatchingArticles(userPrompt, articleHeadlines);

  const articleList = matchingArticleIds.map(id => allArticles.find(article => article._id === id)).filter(article => !!article);

  return new Response(JSON.stringify(sortByDate(articleList)), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}