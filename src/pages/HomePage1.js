import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import componentsList from './componentsList';

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import actionCreators from "../redux_state/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux"
import axiosHandler from "../utils/axiosHandler";

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

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default () => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const fetchColumnData = async () => {
    let sideBar = [{}]
    const sidebarRequest = await axiosHandler.request({ method: 'GET', requestUrl: 'http://localhost:3004/tabsAndOperationTable'})
    console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', sidebarRequest)
    if (sidebarRequest && sidebarRequest.data && sidebarRequest.data.length > 0) sideBar = sidebarRequest.data
    actions.tabsAndOperationData(sideBar[0])
  }
  useEffect(()=>{
    fetchColumnData()
  })

  const sideBar = {
    access_control: {
      users: { flag: true, icon: null },
      roles: { flag: true, icon: null }
    }
  }
  
  const components_List = componentsList.componentListForRoutes.map((lists, index ) => {
    const com = componentsList[lists.component]
    if (lists.parent in sideBar && lists.child in sideBar[lists.parent]) sideBar[lists.parent][lists.child].component = lists.component
    // console.log('Lists =====', (lists.parent !== 'singleWithParent' ? lists.parent in sideBar : false))
    if (lists.parent === 'singleWithParent' || (lists.parent in sideBar && lists.child in sideBar[lists.parent] && sideBar[lists.parent][lists.child].flag === true)) {
      if (lists.with === 'RouteWithLoader') return <Route exact key={index} path={lists.path} element={<RouteWithLoader Component={com}/>} />
      else if (lists.with === 'RouteWithSidebar') {
        return <Route exact key={index} path={lists.path} element={
          <ProtectedRoute>
            <RouteWithSidebar Component={com} data={{sideBar}}/>
          </ProtectedRoute>
        } />
      }
    }
  })

  return (
    <Routes>
      {components_List}
    </Routes>
  )
};
