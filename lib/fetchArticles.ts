"use server";

import { Article } from "../types/article";
import client from "./mongodb";

const ARTICLE_LIMIT = 500;

export async function fetchArticles() {
  const { MONGO_DATABASE, MONGO_ARTICLE_COLLECTION } = process.env;

  if (!MONGO_DATABASE || !MONGO_ARTICLE_COLLECTION) {
    throw new Error("MongoDB env variables missing.");
  }

  try {
    const db = client.db(MONGO_DATABASE);
    const articles = await db
      .collection<Article>(MONGO_ARTICLE_COLLECTION)
      .find({})
      .sort({ date: -1 })
      .limit(ARTICLE_LIMIT)
      .toArray();

    articles.forEach((article) => {
      article._id = article._id.toString();
    });

    return articles;
  } catch (e) {
    console.error(e);
    return [];
  }
};