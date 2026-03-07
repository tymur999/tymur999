import "./about.scss";
import {lazy, PropsWithChildren} from "react";

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

function ExternalLink(props: PropsWithChildren & { href: string }) {
  return (
    <a href={props.href} className="link external-link" target="_blank">{props.children}</a>
  )
}