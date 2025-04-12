"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ArticleInput {
  _id: string;
  headline: string;
}

export async function getMatchingArticles(input: string, articles: ArticleInput[]): Promise<string[]> {
  const prompt = process.env.PROMPT;
  const userContent = JSON.stringify(articles, null, 2);

  console.log([
    { role: 'system', content: prompt },
    { role: 'user', content: userContent }
  ]);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: userContent }
    ],
  });

  console.log("res", completion.choices[0].message);

  const result = completion.choices[0].message.content;

  if (!result) {
    console.error('No response from GPT');
    return [];
  }

  try {
    return JSON.parse(result);
  } catch (err) {
    console.error('Failed to parse GPT response as JSON:', result);
    return [];
  }
}