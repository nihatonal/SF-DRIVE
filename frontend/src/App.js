import React, {useState, useCallback, useContext, useEffect} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation 
} from "react-router-dom";

import { useLayoutEffect } from 'react'

import MainPage from './MainPage/pages/MainPage';
import PageAbout from './PageAbout/pages/PageAbout';
import PageFaq from './PageFaq/pages/PageFaq';
import MainNavigation from './shared/Components/Navigation/MainNavigation';
import MainFooter from './shared/Components/Footer/MainFooter';
import SignUpPage from './SignUpPage/pages/SignUpPage';
import SignUpPhoto from './SignUpPage/pages/SignUpPhoto';
import UserDocs from './SignUpPage/pages/UserDocs';
import FiveHundredTwo from './shared/Components/NotFound/FiveHundredTwo';
import FourHunderFour from './shared/Components/NotFound/FourHunderFour';
import SignUpSuccess from './SignUpPage/pages/SignUpSuccess';

import UserMain from './users/pages/UserMain';

import { AuthContext } from './shared/context/auth-context';

import './App.css';

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  });
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  });

  

  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
  
    return children
  }
 

  let routes;

  if(token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<MainPage />}/>
        <Route path="/about" element={<PageAbout />}/>
        <Route path="/faq" element={<PageFaq />}/>
        <Route path="*" element={<FourHunderFour />}/>
      </React.Fragment> );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<MainPage />}/>
        <Route exact path="/user" element={<UserMain />}/>
        <Route exact path="/about" element={<PageAbout />}/>
        <Route exact path="/faq" element={<PageFaq />}/>
        <Route exact path="/signup" element={<SignUpPage />}/>
        <Route exact path="/userphoto" element={<SignUpPhoto/>} />
        <Route exact path="/userdocs" element={<UserDocs/>} />
        <Route exact path="/signup/success" element={<SignUpSuccess/>} />
        <Route path="*" element={<FourHunderFour />}/>
      </React.Fragment>  
    );
  }
  
  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token, 
      token: token,
      userId: userId, 
      login: login, 
      logout: logout
      }}
    >
      <BrowserRouter>
        <MainNavigation/>
          <Wrapper>
            <Routes >
              {routes}
            </Routes>
          </Wrapper>
        <MainFooter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
