import {Link} from "../router/Link";
import {ROUTES} from "../router/Route";
import ResumePdf from "../img/resume.pdf";
import {motion} from "motion/react";

export function Links() {

  return <div className="links">
    <Link href="/" className="name">
      <motion.h1>Tymur Arsentiev</motion.h1>
    </Link>
    {
      ROUTES.map(([path, name]) =>
        <Link key={path} href={path}>
          <h3>{name}</h3>
        </Link>
      )
    }
    <Link key={ResumePdf} href={ResumePdf} target="_blank">
      <h3>Resume</h3>
    </Link>
  </div>
}