import {createContext, PropsWithChildren, useContext, useEffect, useState, } from "react";
import {DEFAULT, Path, Router} from "./router";

const RouterContext = createContext<Router>(DEFAULT);
export function useRouter() {
  return useContext(RouterContext);
}


export function RouterProvider(props : PropsWithChildren) {
  // path is replaced on every state push/replace/pop
  const [path, setPath] = useState<Path>(window.location.pathname as Path);

  // handle the back/forward button
  useEffect(() => {
    function subscribe(ev: PopStateEvent) {
      setPath(ev.state as Path);
    }

    window.addEventListener("popstate", subscribe);
    return () => window.removeEventListener("popstate", subscribe);
  }, []);

  return <RouterContext.Provider value={{
    pushPage: function(newPath: Path) {
      window.history.pushState(newPath,"", newPath);
      setPath(newPath as Path);
    },
    replacePage: function(newPath: Path) {
        window.history.replaceState(newPath, "", newPath);
        setPath(newPath as Path);
    },
    current: path
  }}>
    {props.children}
  </RouterContext.Provider>
}