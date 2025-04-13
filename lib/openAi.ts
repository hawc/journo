"use server";

import OpenAI from "openai";

const {
  PROMPT,
  PROMPT_FORMATTING,
  OPENAI_MODEL,
} = process.env;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ArticleInput {
  _id: string;
  headline: string;
}

export async function getMatchingArticles(input: string, articles: ArticleInput[]): Promise<string[]> {
  if (!PROMPT || !PROMPT_FORMATTING || !OPENAI_MODEL) {
    throw new Error("OpenAI config missing.");
  }

  const prompt = `${PROMPT} ${input} ${PROMPT_FORMATTING}`;
  const userContent = JSON.stringify(articles, null, 2);

  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    store: true,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: userContent }
    ],
  });

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