import { FC } from "react";

export type Article = {
  id: string;
  title: string;
  summary: string;
  pub_date: string;
  publisher: string;
  publisher_logo: string;
  bias: "Left" | "Centre" | "Right";
  image: string;
};

const colour: Record<Article["bias"], string> = {
  Left:   "bg-primary-blue",
  Centre: "bg-neutral-cool",
  Right:  "bg-accent",
};

export const ArticleCard: FC<{ article: Article }> = ({ article }) => (
  <div className="rounded-lg overflow-hidden bg-surface shadow-md hover:shadow-xl transition">
    <img src={article.image} className="w-full h-44 object-cover" />
    <div className="p-4 space-y-2">
      <span className={`text-xs font-semibold text-bg px-2 py-0.5 rounded ${colour[article.bias]}`}>
        {article.bias}
      </span>
      <h3 className="text-lg font-semibold text-primary-blue">{article.title}</h3>
      <p className="text-sm text-neutral-warm line-clamp-3">{article.summary}</p>
      <div className="text-xs text-neutral-cool flex items-center gap-2">
        <img src={article.publisher_logo} className="h-4" />
        <span>{article.publisher}</span>
      </div>
    </div>
  </div>
);
