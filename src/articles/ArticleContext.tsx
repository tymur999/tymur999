import {createContext, PropsWithChildren, useContext, useState} from "react";
import {Reader} from "./Reader";
import {Article} from "./articles";

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