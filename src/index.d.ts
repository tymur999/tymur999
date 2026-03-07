declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.mdx' {
  import {MDXProps} from "mdx/types";

  let MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
}

declare module '*.md' {
  import {MDXProps} from "mdx/types";

  let MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
}

declare module '*.pdf' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.avif' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.bmp' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.gif' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.jpg' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.jpeg' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.png' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.webp' {
  import {Path} from "./router/router";

  const src: Path;
  export default src;
}

declare module '*.svg' {
  import {Path} from "./router/router";
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: Path;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
