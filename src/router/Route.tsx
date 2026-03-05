import {PropsWithChildren} from "react";
import {useRouter} from "./RouterContext";
import {Path} from "./router";

export function Route(props: PropsWithChildren & {path: Path}) {
  const {path, children} = props;
  const router = useRouter();

  return router.current.toLowerCase() === path ? <>{children}</> : <></>
}