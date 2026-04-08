import {Path} from "../router/router";
import {MDXContent} from "mdx/types";
import {lazy, LazyExoticComponent} from "react";
import allBlack from "../img/IMG_3095.jpg";

export interface Article {
  name: string,
  description: string,
  // image thumbnail
  thumbnail: Path,
  published: Date,
  // lazy load article content
  article: LazyExoticComponent<MDXContent>
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