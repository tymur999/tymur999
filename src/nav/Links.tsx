import {Link} from "../router/Link";
import {motion} from "framer-motion";
import {ROUTES} from "../router/Route";
import ResumePdf from "../img/resume.pdf";

export function Links() {

  return <div className="links">
    <Spacers length={ROUTES.length + 1} />
    <Link href="/" className="name">
      <motion.h1 className="name">Tymur Arsentiev</motion.h1>
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

function Spacers(props: {length: number}) {
  const spacers = [];
  for (let i = 0; i < props.length; i++) {
    spacers.push(<div key={i}/>);
  }

  return spacers;
}