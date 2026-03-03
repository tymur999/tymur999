import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {Menu} from "./Menu";
import wave from "../img/menu-wave.svg";
import "./nav.scss";
import {motion} from "framer-motion";
import {Link} from "../router/Link";

export function Nav() {
    const [active, setActive] = useState(false);

    return <>
        <nav className="header">
            <MenuButton active={active} setActive={setActive}/>
            <Title/>
        </nav>
        <Menu active={active}/>
        <img className="wave" alt="wave" src={wave}/>
    </>;
}

function MenuButton(props : { active: boolean, setActive: (_:boolean) => void }) {
    const {active, setActive} = props;

    return (
      <div className="menu-btn click">
          <button>
              <FontAwesomeIcon icon={faBars} onClick={function() {
                  setActive(!active);
              }} />
          </button>
      </div>
    );
}

function Title() {
   return (
     <Link href="/" className="name click">
       <motion.h1>Tymur Arsentiev</motion.h1>
     </Link>
   );
}