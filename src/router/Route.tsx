import React, {PropsWithChildren} from "react";
import {useRouter} from "./RouterContext";
import {Path} from "./router";

const Canvas = React.lazy(() => import("../index/Canvas"));
const About = React.lazy(() => import("../about/AboutPage"));

export const ROUTES: [Path, string][] = [
  ["/", "Home"],
  ["/about", "About"],
  ["/articles", "Articles"]
];

function Route(props: PropsWithChildren & {path: Path}) {
  const {path, children} = props;
  const router = useRouter();

  return <>{router.current === path && children}</>
}


export function Routes() {
  return <>
    <Route path={ROUTES[0]![0]}>
      <Canvas/>
    </Route>
    <Route path={ROUTES[1]![0]}>
      <About/>
    </Route>
  </>
}