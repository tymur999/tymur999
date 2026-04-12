import {ReactComponent as Wave} from "../img/menu-wave.svg";
import "./nav.sass";
import {Links} from "./Links";

export default function Nav() {
    return <div>
        <nav>
          <Links/>
        </nav>
        <Wave className="wave" />
    </div>;
}