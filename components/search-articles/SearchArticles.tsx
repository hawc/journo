"use client";

import { FormEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { Article } from "../../types/article";
import { ArticleList } from "../article-list/ArticleList";
import { BookmarkedArticles } from "../bookmarked-articles/BookmarkedArticles";

import { ClientOnly } from "../client-only/ClientOnly";
import { Input } from "../input/Input";
import { SubmitButton } from "../submit-button/SubmitButton";
import { SystemMessage } from "../system-message/SystemMessage";
import styles from "./SearchArticles.module.scss";

const placeholders = [
  "Texte mit persönlichem Bezug",
  "Tiergeschichten",
  "Polizeimeldungen",
  "Texte aus Bayern",
  "Traurige Geschichten",
];

interface SearchArticlesProps {
  articles: Article[];
}

export function SearchArticles({ articles }: SearchArticlesProps) {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [articleIds, setArticleIds] = useState<string[]>([]);
  const [warning, setWarning] = useState("Hey! Gib mir ein Thema und ich finde passende Texte dazu.");
  const [isLoading, setIsLoading] = useState(false);

  const filteredArticles = useMemo(() => articles.filter((article) =>
    articleIds.includes(article._id)
  ), [articleIds, articles]);

  const handleGetArticles: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    if (!inputValue) {
      setInputValue(placeholder);
    }

    setWarning("");
    setIsLoading(true);

    const response = await fetch("/api/getArticles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userPrompt: inputValue }),
    });
    const data = await response.json();

    setIsLoading(false);
    setArticleIds(data);
  }, [inputValue]);

  // rotate placeholder every 5 seconds
  const rotatePlaceholder = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    const newPlaceholder = placeholders[randomIndex];
    if (newPlaceholder !== placeholder) {
      setPlaceholder(newPlaceholder);
    }
  }, [placeholder, placeholders]);

  useEffect(() => {
    setTimeout(rotatePlaceholder, 5000);
  }, []);

  return (
    <>
      <form
        onSubmit={handleGetArticles} className={styles["input-container"]}>
        <Input value={inputValue} placeholder={placeholder} disabled={isLoading} onChange={setInputValue} />
        <SubmitButton disabled={isLoading} isLoading={isLoading} />
      </form>
      <div className={styles.content}>
        {isLoading && (
          <SystemMessage>Lädt...</SystemMessage>
        )}
        {warning && (
          <SystemMessage>{warning}</SystemMessage>
        )}
        <ClientOnly>
          {!isLoading && !warning && (
            <>
              <h2>Deine Suchergebnisse</h2>
              <ArticleList articles={filteredArticles} />
            </>
          )}
          <BookmarkedArticles articles={articles} />
        </ClientOnly>
      </div>
    </>
  );
}