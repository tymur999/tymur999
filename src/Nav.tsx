import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";

export function Nav() {
    return <nav className="header">

        <button className="menu">
            <FontAwesomeIcon icon={faBars}/>
        </button>
        <div className="name">Tymur Arsentiev</div>
    </nav>;
}