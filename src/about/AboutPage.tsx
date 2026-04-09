import "./about.sass";
import {lazy} from "react";
import {ExternalLink} from "../router/Link";
import {motion} from "motion/react";
import {AnimateFade} from "../animations";

const About = lazy(() => import("./About.mdx"));

const main = AnimateFade();
export default function AboutPage() {
  return <motion.main initial={main.initial} animate={main.animate} className="about-page">
    <div className="edge"/>
    <section className="about-container">
      <About components={{
        'a': ExternalLink,
      }}/>
    </section>
    <div className="edge"/>
  </motion.main>
}
