export type AttributeType = 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';

export type ContentType = 'text' | 'html' | 'attribute';

export type Count = 'unique' | 'multiple';

export type Framework = 'bineos' | 'ippen';

interface Selector {
  selector: string;
  content: ContentType;
  attribute: string;
  type: AttributeType;
  count: Count;
}

interface ArticleData {
  teaser: Selector;
  headline: Selector;
  subline?: Selector;
  content: Selector;
  date: Selector;
}

export interface Config {
  _id: string;
  framework: Framework;
  url: string;
  name: string;
  location: string;
  globs: string[];
  articles: {
    data: ArticleData;
  };
};

export interface ConfigInput {
  framework: Framework;
  url: string;
  name: string;
  location: string;
  globs: string[];
  articles: {
    data: ArticleData;
  };
};