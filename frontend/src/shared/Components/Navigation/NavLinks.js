import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./Navlinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <>
      {/*  */}

      {auth.isLoggedIn ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__nav-item is-active" : "header__nav-item"
          }
          to="/user"
        >
          Бронирования
        </NavLink>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__nav-item is-active" : "header__nav-item"
          }
          to="/about"
        >
          О нас
        </NavLink>
      )}
      {auth.isLoggedIn ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__nav-item is-active" : "header__nav-item"
          }
          to="/usercars"
        >
          Мои автомобили
        </NavLink>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__nav-item is-active" : "header__nav-item"
          }
          to="/conditions"
        >
          Условия
        </NavLink>
      )}
      {auth.isLoggedIn ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__nav-item is-active" : "header__nav-item"
          }
          to="/messages"
        >
          Сообщения
        </NavLink>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive ? "header__nav-item is-active" : "header__nav-item"
          }
          to="/faq"
        >
          Частые вопросы
        </NavLink>
      )}
    </>
  );
};

export default NavLinks;
