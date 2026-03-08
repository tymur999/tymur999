import {Article} from "./articles";

export function Reader(article: Article) {
  return <div>{article.name}</div>
}