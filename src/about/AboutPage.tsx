import "./about.sass";
import {lazy} from "react";
import {ExternalLink} from "../router/Link";

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
