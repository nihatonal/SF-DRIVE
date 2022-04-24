import React, { useState, useCallback, useContext, useEffect } from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { useLayoutEffect } from "react";

import MainPage from "./MainPage/pages/MainPage";
import PageAbout from "./PageAbout/pages/PageAbout";
import PageFaq from "./PageFaq/pages/PageFaq";
import MainNavigation from "./shared/Components/Navigation/MainNavigation";
import MainFooter from "./shared/Components/Footer/MainFooter";
import SignUpPage from "./SignUpPage/pages/SignUpPage";
import SignUpPhoto from "./SignUpPage/pages/SignUpPhoto";
import UserDocs from "./SignUpPage/pages/UserDocs";
import FiveHundredTwo from "./shared/Components/NotFound/FiveHundredTwo";
import FourHunderFour from "./shared/Components/NotFound/FourHunderFour";
import SignUpSuccess from "./SignUpPage/pages/SignUpSuccess";


import UserMain from "./users/pages/UserMain";
import MyCars from "./users/pages/MyCars";
import AddCar from "./users/components/AddCar";
import AddCarSuccess from "./users/components/AddCarSuccess";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from './shared/hooks/auth-hook';

import "./App.css";


function App() {
  
  const { token, login, logout, userId } = useAuth();

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return children;
  };

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/user" element={<UserMain />} />
        <Route exact path="/user/mycars" element={<MyCars/>} />
        <Route exact path="/user/addcar" element={<AddCar/>} />
        <Route exact path="/user/mycars/success" element={<AddCarSuccess/>} />
        <Route path="*" element={<FourHunderFour />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/about" element={<PageAbout />} />
        <Route exact path="/faq" element={<PageFaq />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/userphoto" element={<SignUpPhoto />} />
        <Route exact path="/userdocs" element={<UserDocs />} />
        <Route exact path="/signup/success" element={<SignUpSuccess />} />
        <Route path="*" element={<FourHunderFour />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <Wrapper>
          <Routes>{routes}</Routes>
        </Wrapper>
        <MainFooter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
