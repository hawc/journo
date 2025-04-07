import { NextApiRequest, NextApiResponse } from 'next';
import client from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = client.db("journo");
    const articles = await db
      .collection("articles")
      .find({})
      .limit(10)
      .toArray();
    res.json(articles);
  } catch (e) {
    console.error(e);
  }
}

