import {createContext, lazy, LazyExoticComponent, PropsWithChildren, useContext, useState} from "react";
import {Path} from "../router/router";
import {MDXContent} from "mdx/types";
import allBlack from "../img/IMG_3095.jpg";
import {Reader} from "./Reader";

export interface Article {
  name: string,
  description: string,
  // image thumbnail
  thumbnail: Path,
  published: Date,
  // lazy load article content
  article: MDXContent | LazyExoticComponent<MDXContent>
}

export const ARTICLES: Article[] = [
  {
    name: "My high school experience",
    description: "My first program, winning two senior superlatives, and why (and how) I chose Georgia Tech",
    thumbnail: allBlack,
    published: new Date(Date.parse("3/15/2026")),
    article: lazy(() => import("./mdx/high-school.mdx"))
  }
]

const articleContext =
  createContext<ReturnType<typeof useState<Article | undefined>>>([undefined, function(){}]);

export function useArticle() {
  return useContext(articleContext);
}

export default function ArticleProvider({ children }: PropsWithChildren) {
  const state = useState<Article | undefined>(undefined);
  return <articleContext.Provider value={state}>
    <Reader/>
    {children}
  </articleContext.Provider>;
}