import {Path} from "../router/router";
import {MDXContent} from "mdx/types";
import type {LazyExoticComponent} from "react";

export interface Article {
  name: string,
  description: string,
  // image thumbnail
  thumbnail: Path,
  published: Date,
  // lazy load article content
  article: MDXContent | LazyExoticComponent<MDXContent>
}