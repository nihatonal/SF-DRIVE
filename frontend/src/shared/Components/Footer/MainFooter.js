import React from "react";
import { useLocation } from "react-router-dom";

import SocialLinks from "./SocialLinks";
import "./MainFooter.css";

const MainFooter = (props) => {
  const { pathname } = useLocation();
  if (
    pathname === "/signup" ||
    pathname === "/usercars" ||
    pathname === "/userphoto" ||
    pathname === "/userdocs" ||
    pathname === "/signup/success" ||
    pathname === "/usercars/addcar" ||
    pathname === "/user/usercar"
  )
    return null;

  const content = (
    <footer className={"footer content_wrapper"}>
      <div className="footer__content">
        <p className="footer__copyright">© SkillDrive Inc. 2020</p>
        <SocialLinks />
      </div>
    </footer>
  );

  return content;
};

export default MainFooter;
