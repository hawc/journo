"use server";

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat";

const {
  PROMPT_SYSTEM,
  OPENAI_MODEL,
} = process.env;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ArticleInput {
  _id: string;
  headline: string;
  teaser?: string;
}

interface Match {
  article: {
    headline: string;
  },
  message: string;
}

const matchSchema = {
  type: "object",
  properties: {
    matches: {
      type: "array",
      maxItems: 50,
      items: {
        type: "object",
        properties: {
          article: {
            type: "object",
            additionalProperties: false,
            properties: {
              headline: { type: "string" },
            },
            required: ["headline"],
          },
        },
        required: ["article"],
        additionalProperties: false,
      },
    },
    message: { type: "string" },
  },
  required: ["matches", "message"],
  additionalProperties: false,
};


export async function getMatchingArticles(input: string, articles: ArticleInput[]): Promise<string[]> {
  if (!PROMPT_SYSTEM || !OPENAI_MODEL) {
    throw new Error("OpenAI config missing.");
  }

  const userPayload = {
    query: input,
    articles: articles
  };

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: PROMPT_SYSTEM
    },
    {
      role: "user",
      content: JSON.stringify(userPayload)
    }
  ];

  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "matching",
        strict: true,
        schema: matchSchema,
      },
    },
    store: true,
    messages: messages,
  });

  const result = completion.choices[0].message.content;

  console.log('GPT response:', result);

  if (!result) {
    console.error('No response from GPT');
    return [];
  }

  try {
    const headlines = JSON.parse(result).matches.map((match: Match) => match.article.headline);

    console.log('Matched headlines:', headlines);

    return articles
      .filter(article => headlines.includes(article.headline))
      .map(article => article._id);
  } catch (err) {
    console.error('Failed to parse GPT response as JSON:', result);

    return [];
  }
}