import React, {useState} from "react";
import {Link} from "../router/Link";
import {motion} from "framer-motion";

export function Links() {
  const [links, setLinks] = useState(["About", "Articles"]);

  return <div className="links">
    { links.map(() => /* add spacers for flexbox */ <div/> )}
    <Title/>
    { links.map(link => <Link href={`/${link}`}><h3>{link}</h3></Link>) }
  </div>
}

function Title() {
  return (
    <Link href="/" className="name">
      <motion.h1 className="name">Tymur Arsentiev</motion.h1>
    </Link>
  );
}
