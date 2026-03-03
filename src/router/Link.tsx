import React, {PropsWithChildren} from "react";
import {useRouter} from "./RouterContext";

export function Link(props: {className: string, href: string, replace?: boolean } & PropsWithChildren) {
  const {children, className, href, replace} = props;
  const router = useRouter();

   function onClick(event: React.MouseEvent) {
        event.preventDefault();
        if(replace) {
          router.replacePage(props.href);
        } else {
          router.pushPage(props.href);
        }
   }

  return <a onClick={onClick} href={href} className={className}>{children}</a>
}