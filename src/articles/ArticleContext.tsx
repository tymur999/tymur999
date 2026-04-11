import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Reader} from "./Reader";
import {Article, ARTICLES} from "./articles";
import {useRouter} from "../router/RouterContext";
import {Path} from "../router/router";

const articleContext =
  createContext<ReturnType<typeof useState<Article | undefined>>>([undefined, function(){}]);

export function useArticle() {
  return useContext(articleContext);
}

const ARTICLE_QUERY = "a";
export default function ArticleProvider({ children }: PropsWithChildren) {
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if(params.has(ARTICLE_QUERY)) {
      const id = Number.parseInt(params.get(ARTICLE_QUERY)!);
      setArticle(ARTICLES[id]);
    }
  }, [setArticle]);

  useEffect(() => {
    if(!article) {
      // query param
      const params = new URLSearchParams(location.search);
      if(params.has(ARTICLE_QUERY)) {
        router.replacePage(location.pathname as Path);
      }
    } else {
      const id = ARTICLES.indexOf(article);
      router.replacePage(`${location.pathname}?${ARTICLE_QUERY}=${id}` as Path);
    }
  }, [article]);

  return <articleContext.Provider value={[article, setArticle]}>
    <Reader/>
    {children}
  </articleContext.Provider>;
}