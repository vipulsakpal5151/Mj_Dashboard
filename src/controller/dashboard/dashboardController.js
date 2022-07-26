// axios
import React, { useState, useEffect, FC } from 'react';
import axiosHandler from '../../utils/axiosHandler'
import util from '../../utils/util'
import loggers from "../../utils/loggers";
import common_function from "../../utils/common_function";
import { Navigate,useLocation } from "react-router-dom";
import Preloader from "../../components/Preloader";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import request from '../../utils/request';

// Components ********************************************
export const ProtectedRoute = ({ children }) => {
  const userDetails = common_function.getCookies(util.localStorageUserDetails) || null
  if (!userDetails) {
    return <Navigate to="/" />;
  }
  return children;
};

export const CheckAlredyLoginOrNot = ({ children }) => {
  const userDetails = common_function.getCookies(util.localStorageUserDetails) || null
  const location = useLocation();
  if (userDetails) {
    if (location.pathname.split("/").length > 2) return <Navigate to={location.pathname} />;
    return <Navigate to="/dashboard/overview" />;
  }
  return children;
};

export const RouteWithLoader = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { Component } = props
  return (
    <> <Preloader show={loaded ? false : true} /> <Component /> </>
  );
};

export const RouteWithSidebar = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [jwtFlag, setJwtFlag] = useState(JSON.parse(localStorage.getItem('userDetails')));
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // For footer setting
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }
  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  const { Component, data } = props
  return jwtFlag ? (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar data={{sideBar: data.sideBar}}/>
        <main className="content">
          <Navbar />
          <Component />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
  ) : (
    // if jwt token missing redirect to sign in page
    <Navigate to={{ pathname: '/examples/sign-in' }} />
  );
};


// Functions ********************************************
const getUserpermission = async () => {
  try {
    loggers.logs('dashboardController.js', 'getUserpermission', 'request', 'null')
    const userData = common_function.getCookies(util.localStorageUserDetails)
    loggers.logs('dashboardController.js', 'getUserpermission', 'userData', userData)
    const requestData = userData && userData.email ? { email: userData.email } : null
    if (requestData) {
      const userPermissionsData = await axiosHandler.requestOnlyData({ method: 'POST', requestUrl: request.user_permissions, data: requestData })
      loggers.logs('dashboardController.js', 'getUserpermission', 'userPermissionsData', JSON.stringify(userPermissionsData))
      return userPermissionsData
    } else {
      return { status: 400, message: 'Fail', respcode: 1001 }
    }
} catch (error) {
    return { status: 400, message: 'Fail', respcode: 1001 }
  }
}

export default {
  getUserpermission
}