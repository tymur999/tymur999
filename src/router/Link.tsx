import "./link.sass";

import React, {HTMLProps, ReactNode} from "react";
import {useRouter} from "./RouterContext";
import {Path} from "./router";

export function Link(props: {href: Path, children : ReactNode, target?: '_blank' } & HTMLProps<HTMLAnchorElement>) {
  let {children, className, href} = props;
  const router = useRouter();
  className = `${className ?? ""} link`.trim();

   function onClick(event: React.MouseEvent) {
     // perform the default action if _blank
     if(props.target === "_blank") {
       return;
     }

     event.preventDefault();
     if(window.location.pathname === href) {
       router.replacePage(props.href);
     } else {
       router.pushPage(props.href);
     }
   }

  return <a {...props} onClick={onClick} className={className}>
    {children}
   </a>
}