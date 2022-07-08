import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import componentsList from './componentsList';

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

// For Page Like Login Registration
const RouteWithLoader = (props) => {
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

// For Dashboard Menu's
const RouteWithSidebar = (props) => {
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

  const { Component } = props
  return jwtFlag ? (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar data={props.data.sidebarData}/>
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

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default () => {
  const [sidebarData, setSidebarData] = useState([])
  const fetchColumnData = async () => {
    let sideBar = []
    const axiosHandler = require("../utils/axiosHandler");
    const sidebarRequest = await axiosHandler.request({ method: 'GET', requestUrl: 'http://localhost:3004/sidebar'})
    console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', sidebarRequest)
    if (sidebarRequest && sidebarRequest.data && sidebarRequest.data.length > 0) sideBar = sidebarRequest.data
    setSidebarData(sideBar)
  }
  useEffect(()=>{
    fetchColumnData()
  }, [])

  // Creating all Route components
  const components_List = componentsList.componentListForRoutes.map((lists, index ) => {
    const com = componentsList[lists.component]
    if (lists.with === 'RouteWithLoader') return <Route exact key={index} path={lists.path} element={<RouteWithLoader Component={com}/>} />
    else if (lists.with === 'RouteWithSidebar') {
      return <Route exact key={index} path={lists.path} element={
        <ProtectedRoute>
          <RouteWithSidebar Component={com} data={{ sidebarData }}/>
        </ProtectedRoute>
      } />
    }
  })

  return (
    <Routes>
      {components_List}
    </Routes>
  )
};
