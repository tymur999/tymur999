import "./about.scss";
import openingImage from "../img/IMG_20240725_175449_803.jpg";
import rainbow from "../img/IMG-0186.jpg";
import japanese from "../img/IMG_20230531_000224_01.jpg";
import {PropsWithChildren} from "react";

export default function AboutPage() {
  return <main>
    <div className="edge">

    </div>
    <section className="about-container">
      <img src={openingImage} alt="Tymur Arsentiev" className="self"/>
      <h1 className="title">Welcome to my blog and personal website!</h1>
      <p>
        For the longest time, I never had a personal website to show my skills.
        I'm a longtime coder, project after project, but have never considered making a place to share my thoughts.
        After a while, I was inspired by my <ExternalLink href="https://medium.com/@tymur.arsent">Medium</ExternalLink> and
        &nbsp;<ExternalLink  href="https://substack.com/@timsnodocmartins">Substack</ExternalLink> account to begin journaling my thoughts on my own.
      </p>
      <p>
        I like to take pride in my uniqueness as a web developer.
        I don't go for trends, I consider myself <i>the trendsetter.</i>&nbsp;
        My website design was definitely influenced by my fashion sense.
      </p>
      <h2>Fashion Rebel</h2>
      <div className="clothing">
        <img src={rainbow} alt="Rainbow colored clothing"/>
        <img src={japanese} alt="Purple shirt with Japanese text"/>
      </div>
      <p>
        Clothes shopping is a great knack of mine. I'm skilled in finding all kinds of weird clothes to wear.
        I like doing stuff that makes me stand out, as you can see from the gallery.
      </p>
      <p>
        My store of choice is <ExternalLink href="https://www.ebay.com/usr/tymur999">Ebay</ExternalLink>, where I love thrifting out-of-this-world outfits for a low price.
        EBay is a place for me to liquidate my assets, which is random items around the house.
        My favorite thing about Ebay is that they have almost every clothing brand, typically at reduced prices due to use.
      </p>
    </section>
    <div className="edge">

    </div>
  </main>
}

function ExternalLink(props: PropsWithChildren & { href: string }) {
  return (
    <a href={props.href} className="link external-link" target="_blank">{props.children}</a>
  )
}