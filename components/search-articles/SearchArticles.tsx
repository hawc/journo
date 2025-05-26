"use client";

import classNames from "classnames";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { Article } from "../../types/article";
import { ArticleList } from "../article-list/ArticleList";
import { Checkbox } from "../checkbox/Checkbox";
import { ClientOnly } from "../client-only/ClientOnly";
import { Input } from "../input/Input";
import { SubmitButton } from "../submit-button/SubmitButton";
import { SystemMessage } from "../system-message/SystemMessage";

import { BookmarkedArticles } from "../bookmarked-articles/BookmarkedArticles";
import styles from "./SearchArticles.module.scss";

const placeholders = [
  "Haustiere",
  "Polizei",
  "Bayern",
  "Lokales",
];

const SEARCH_MAJOR_MEDIA = false;
const PLACEHOLDER_ROTATION_INTERVAL = 4000;

export function SearchArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [includeNews, setIncludeNews] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      setInputValue(query);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (inputValue) {
      params.set("q", inputValue);
    } else {
      params.delete("q");
    }

    const parameters = params.size > 0 ? `?${params.toString()}` : "";
    const newUrl = `${window.location.pathname}${parameters}`;

    window.history.replaceState({}, "", newUrl);
  }, [inputValue]);


  const handleGetArticles = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if (!inputValue) {
      setInputValue(placeholder);
    }

    setWarning("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/getArticles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: inputValue || placeholder, includeNews }),
      });

      const data = await response.json();

      setHasSearched(true);
      setArticles(data);
    } catch (error) {
      setWarning("Fehler beim Abrufen der Artikel");
    } finally {
      setIsLoading(false);
    }
  }, [placeholder, inputValue, includeNews]);

  const rotatePlaceholder = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    const newPlaceholder = placeholders[randomIndex];
    if (newPlaceholder !== placeholder) {
      setPlaceholder(newPlaceholder);
    }
  }, [placeholder, placeholders]);

  useEffect(() => {
    const timeout = setTimeout(rotatePlaceholder, PLACEHOLDER_ROTATION_INTERVAL);

    return () => {
      clearTimeout(timeout);
    };
  }, [placeholder]);

  return (
    <>
      <form onSubmit={handleGetArticles} className={styles["input-container"]}>
        <div className={styles["form-row"]}>
          <Input value={inputValue} placeholder={`z.B. ${placeholder}`} disabled={isLoading} onChange={setInputValue} />
          <SubmitButton disabled={isLoading} isLoading={isLoading} />
        </div>
        {SEARCH_MAJOR_MEDIA && (
          <Checkbox disabled={isLoading} label="Suche auch überregional" value={includeNews} onChange={setIncludeNews} />
        )}
      </form>
      <div className={styles.content}>
        {warning && (
          <SystemMessage>{warning}</SystemMessage>
        )}
        <ClientOnly>
          {!warning && hasSearched && (
            <div className={classNames(styles.results, isLoading && styles.loading)}>
              <h2>Deine Suchergebnisse</h2>
              <ArticleList articles={articles} />
            </div>
          )}
          {!hasSearched && (
            <div className={styles.placeholder}>
              <SystemMessage>Gib einen Suchbegriff ein</SystemMessage>
            </div>
          )}
          <BookmarkedArticles />
        </ClientOnly>
      </div>
    </>
  );
}