import { fetchArticles } from "../../../lib/fetchArticles";
import { getMatchingArticles } from "../../../lib/openAi";
import { Article } from "../../../types/article";

export async function POST(request: Request) {
  const body = await request.json();
  const { userPrompt } = body;

  const articles = await fetchArticles();
  const articleHeadlines = articles.map((article: Article) => {
    return { _id: article._id, headline: article.headline };
  });

  const matchingArticleIds = await getMatchingArticles(userPrompt, articleHeadlines);
  console.log("matchingArticleIds", matchingArticleIds);

  return new Response(JSON.stringify(matchingArticleIds), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}