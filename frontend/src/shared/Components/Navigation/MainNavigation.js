import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import ButtonSignIn from "../../../shared/Components/UIElements/ButtonSignIn";
import close from "../../../assets/icons/close.svg";
import Avatar from "../UIElements/Avatar";
import SignInModal from "../../../users/components/SignInModal";
import RenewPassword from "../../../users/components/RenewPassword";
import Top from "../../../assets/images/top.jpg";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import "./MainNavigation.css";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const { sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const userId = useParams().userId;

  const [setShowAuth, setshowAuthModal] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [setBackAuth, setBackAuthModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
    console.log(userId);
  }, [sendRequest]);


  const showAuthHandler = () => {
    setshowAuthModal(true);
    console.log(loadedUsers)
  };

  const closeAuthHandler = () => {
    setshowAuthModal(false);
    setBackAuthModal(false);
  };

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const setBackAuthModalHandler = () => {
    setBackAuthModal(false);
    setshowAuthModal(true);
  };
  const renewPasswordHandler = () => {
    setBackAuthModal(true);
    setshowAuthModal(false);
  };

  const state = 400;
  if (state === 400) {
    return (
      <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <div className="side-drawer_head">
            <div className={"side-drawer__logo"}>
              <Link className={"side-drawer__logo-name"} to="/">
                <p>SkillDrive</p>
              </Link>
              <div className={"side-drawer-line first"}></div>
              <div className={"side-drawer-line second"}></div>
            </div>
            <div
              className="side-drawer_head-close"
              show={drawerIsOpen}
              onClick={closeDrawerHandler}
            >
              <img src={close} alt="X" />
            </div>
          </div>

          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>

          {/* <Button button={"Войти"} onClick={showAuthHandler} /> */}
          {/* <ButtonSignIn btn ="Войти" className="header__btn" btnclassName="header__btn-signin" btnonClick={showAuthHandler}/> */}
          <div className={"side-drawer__btn"}>
            <button
              className={"side-drawer__btn-signin"}
              onClick={showAuthHandler}
            >
              Войти
            </button>
          </div>
        </SideDrawer>

        <SignInModal
          show={setShowAuth && !setBackAuth}
          forgetpassword={renewPasswordHandler}
          close={closeAuthHandler}
          footer={closeAuthHandler}
        />

        <RenewPassword
          show={setBackAuth}
          close={closeAuthHandler}
          goBackAuth={setBackAuthModalHandler}
        />

        <MainHeader>
          <div className="header__wrapper content-container">
            <div className={"header__logo"}>
              <Link className={"header__logo-name"} to="/">
                <p>SkillDrive</p>
              </Link>
              <div className={"header__logo-line first"}></div>
              <div className={"header__logo-line second"}></div>
            </div>

            <nav
              className="header__nav"
              style={{ width: auth.isLoggedIn && "353px" }}
            >
              <NavLinks />
            </nav>

            {!auth.isLoggedIn ? (
              <ButtonSignIn
                btn="Войти"
                className="header__btn"
                btnclassName="header__btn-signin"
                btnonClick={showAuthHandler}
              />
            ) : (
              <Avatar image={Top} alt={"avatar"} />
            )}

            <div className="header__menu-icon" onClick={openDrawerHandler}>
              <div className={"header__menu-icon-item"} />
              <div className={"header__menu-icon-item"} />
              <div className={"header__menu-icon-item"} />
            </div>
          </div>
        </MainHeader>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default MainNavigation;
