"use server";

export interface NewsApiArticle {
  source: {
    name: string;
  },
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export async function fetchNewsApi(query: string) {
  if (!process.env.NEWSAPI_URI) {
    return [] as NewsApiArticle[];
  }

  const request = await fetch(process.env.NEWSAPI_URI + "&language=de&q=" + query, {
    headers: {
      "accept": "application/json"
    }
  });

  const response = await request.json();

  if (response.status !== "ok") {
    console.error("NewsAPI request was unsuccessful.");

    return [] as NewsApiArticle[];
  }

  return response.articles as NewsApiArticle[];
}