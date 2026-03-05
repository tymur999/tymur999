import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {Menu} from "./Menu";
import wave from "../img/menu-wave.svg";
import "./nav.scss";
import {motion} from "framer-motion";
import {Link} from "../router/Link";
import {Path} from "../router/router";
import {Links} from "./Links";

export default function Nav() {
    const [active, setActive] = useState(false);

    return <>
        <nav>
          <MenuButton active={active} setActive={setActive}/>
          <Links/>
        </nav>
        <Menu active={active}/>
        <img className="wave" alt="wave" src={wave}/>
    </>;
}

function MenuButton(props : { active: boolean, setActive: (_:boolean) => void }) {
    const {active, setActive} = props;

    return (
      <div className="menu-btn">
          <button>
              <FontAwesomeIcon icon={faBars} onClick={function() {
                  setActive(!active);
              }}/>
          </button>
      </div>
    );
}
