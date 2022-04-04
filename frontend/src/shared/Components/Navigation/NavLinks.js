import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './Navlinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <>    
            <NavLink   className={({ isActive }) => (isActive ? 'header__nav-item is-active' : 'header__nav-item')} to="/about" >О нас</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'header__nav-item is-active' : 'header__nav-item')}  to="/conditions">Условия</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'header__nav-item is-active' : 'header__nav-item')}  to="/faq">Частые вопросы</NavLink>
        </>
    )
};

export default NavLinks;