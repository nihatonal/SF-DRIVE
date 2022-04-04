import React from "react";
import { Link } from 'react-router-dom';

import './Logo.css';

const Logo = (props) => {

    return (
        <div className = {`logo-wrapper ${props.className}`}>
            <Link className = {"logo-name"} to="/"><p >SkillDrive</p></Link>
            <div className = {"logo-line first-line"}></div>
            <div className = {"logo-line second-line"}></div>
        </div>
    )

};

export default Logo;