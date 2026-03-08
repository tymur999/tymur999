import React, {PropsWithChildren} from "react";
import {useRouter} from "./RouterContext";
import {Path} from "./router";
import {ArticlesList} from "../articles/ArticlesList";

type Route = [Path, string];
type Routes = [Route, Route, Route];
export const ROUTES: Routes = [
  ["/", "Home"],
  ["/about", "About"],
  ["/articles", "Articles"]
];

function Route(props: PropsWithChildren & {route: Route}) {
  const {route: [path], children} = props;
  const router = useRouter();

  return <>{router.current === path && children}</>
}


const Canvas = React.lazy(() => import("../index/Canvas"));
const About = React.lazy(() => import("../about/AboutPage"));


export function Routes() {
  const [index, about, articles] = ROUTES;

  return <>
    <Route route={index}>
      <Canvas/>
    </Route>
    <Route route={about}>
      <About/>
    </Route>
    <Route route={articles}>
      <ArticlesList/>
    </Route>
  </>
}