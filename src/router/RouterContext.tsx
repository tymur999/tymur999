import {createContext, PropsWithChildren, useContext, useEffect, useSyncExternalStore} from "react";
import {HistoryState, Path, Router} from "./router";
import * as repl from "node:repl";

const DEFAULT : Router = {
  current: {
    currentPage: window.location.pathname as Path
  },
  pushPage: function(){},
  replacePage: function(){}
};

const RouterContext = createContext<Router>(DEFAULT);

export function useRouter() {
  return useContext(RouterContext);
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);

  // return unsubscribe function
  return function() {
    window.removeEventListener("popstate", onChange);
  }
}

function getSnapshot(): HistoryState {
  return window.history.state ?? DEFAULT;
}

function pushState(path: string) {
  window.history.pushState({
      currentPage: path as Path
    },
    "",
    path);
}

function replaceState(path: string) {
  window.history.replaceState({
      currentPage: path as Path
    },
    "",
    path);
}

export function RouterProvider(props : PropsWithChildren) {
  const state = useSyncExternalStore<HistoryState>(subscribe, getSnapshot);

  // start history with initial page
  useEffect(() => {
    replaceState(window.location.pathname);
  }, []);

  return <RouterContext.Provider value={{
    replacePage: replaceState,
    pushPage: pushState,
    current: state
  }}>
    {props.children}
  </RouterContext.Provider>
}