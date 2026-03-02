import {createContext, PropsWithChildren, useContext, useSyncExternalStore} from "react";

const RouterContext = createContext<{}>({});

export function useRouter() {
  return useContext(RouterContext);
}

export function RouterProvider(props : PropsWithChildren) {

  return <RouterContext.Provider value={{}}>
    {props.children}
  </RouterContext.Provider>
}