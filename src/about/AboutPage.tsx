import "./about.scss";
import {HTMLProps, lazy} from "react";
import {Link} from "../router/Link";
import {Path} from "../router/router";

const About = lazy(() => import("./About.mdx"));

export default function AboutPage() {
  return <main className="about-page">
    <div className="edge"/>
    <section className="about-container">
      <About components={{
        'a': ExternalLink,
      }}/>
    </section>
    <div className="edge"/>
  </main>
}

function ExternalLink(props: HTMLProps<HTMLAnchorElement>) {
  return (
    <Link {...props} href={props.href as Path} className="external-link" target="_blank">{props.children}</Link>
  )
}