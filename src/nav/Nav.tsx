import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {ReactComponent as Wave} from "../img/menu-wave.svg";
import "./nav.sass";
import {Links} from "./Links";
import {Menu} from "./Menu";

export default function Nav() {
    const [active, setActive] = useState(false);

    return <div>
        <nav>
          <MenuButton active={active} setActive={setActive}/>
          <Links/>
        </nav>
        <Wave className="wave" />
        <Menu active={active}/>
    </div>;
}

function MenuButton(props : { active: boolean, setActive: (_:boolean) => void }) {
    const {active, setActive} = props;

    return (
        <button className="menu-btn link">
            <FontAwesomeIcon icon={faBars} onClick={function() {
                setActive(!active);
            }}/>
        </button>
    );
}
