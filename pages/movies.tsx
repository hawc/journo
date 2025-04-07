import { GetServerSideProps } from 'next';
import client from "../lib/mongodb";

interface Movie {
  _id: string;
  headline: string;
  teaser: string;
  content: string;
  date: Date;
}

interface MoviesProps {
  articles: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ articles }) => {
  return (
    <div>
      <h1>Crawled Articles</h1>
      <main>
        {articles.map((article) => (
          <article key={article._id}>
            <h2>{article.headline}</h2>
            <h3>{new Date(article.date).toLocaleDateString()}</h3>
            <h4>{article.teaser}</h4>
            <p>{article.content}</p>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Movies;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const db = client.db("journo");
    const articles = await db
      .collection("articles")
      .find({})
      .sort({ date: -1 })
      .toArray();
    return {
      props: { articles: JSON.parse(JSON.stringify(articles)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { articles: [] } };
  }
};
