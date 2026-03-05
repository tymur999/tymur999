import "./link.scss";

import React, {PropsWithChildren} from "react";
import {useRouter} from "./RouterContext";
import {Path} from "./router";

export function Link(props: {className?: string, href: Path, replace?: boolean } & PropsWithChildren) {
  const {children, className, href} = props;
  const router = useRouter();

   function onClick(event: React.MouseEvent) {
        event.preventDefault();
        if(window.location.pathname === href) {
          router.replacePage(props.href);
        } else {
          router.pushPage(props.href);
        }
   }

  return <a onClick={onClick} href={href} className={`${className} link`}>{children}</a>
}