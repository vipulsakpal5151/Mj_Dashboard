import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { RoutesPage } from "../routes";

// pages
// import Presentation from "./Presentation";
// import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
// import Transactions from "./Transactions";
// import Settings from "./Settings";
// import BootstrapTables from "./tables/BootstrapTables";
// import Signin from "./examples/Signin";
// import Signup from "./examples/Signup";
// import ForgotPassword from "./examples/ForgotPassword";
// import ResetPassword from "./examples/ResetPassword";
// import Lock from "./examples/Lock";
// import NotFoundPage from "./examples/NotFound";
// import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import componentsList from './componentsList';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [jwtFlag, setJwtFlag] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  // return (
  //   <Route {...rest} render={props => (
  //     <>
  //       <Preloader show={loaded ? false : true} />
  //       <Sidebar />
  //       {/* {console.log('Props', props)} */}
  //       <main className="content">
  //         <Navbar />
  //         <Component {...props} />
  //         <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
  //       </main>
  //     </>
  //   )}
  //   />
  // );

  return (
    <Route
      {...rest}
      render={props => {
        return jwtFlag ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />
            {/* {console.log('Props', props)} */}
            <main className="content">
              <Navbar />
              <Component {...props} />
              <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
            </main>
          </>
        ) : (
          <Navigate to={{ pathname: '/examples/sign-in', state: { from: props.location } }} />
        )
      }}
    />
  )
};


export default (props) => {
  // if (1 === 1) setJwtFlag(true)
  console.log('Dashboard', DashboardOverview)
  // const components_List = props.list.map((lists, index ) => {
  //   const com = componentsList[lists.component]
  //   if(lists.component === 'DashboardOverview') console.log('com', componentsList[lists.component])
  //   return <Route exact key="{index}" path={lists.path} element={React.createElement(com)} />
  // })
  const components_List = props.list.map((lists, index ) => {
    if(lists.with === 'RouteWithLoader') {
      return ( <RouteWithLoader exact key="{index}" path={lists.path} component={componentsList[lists.component]} />)
    } else if(lists.with === 'RouteWithSidebar') {
      return ( <RouteWithSidebar exact key="{index}" path={lists.path} component={componentsList[lists.component]} />)
    }
  })
  console.log('components_List', components_List)
  return (
    <Routes>
      { React.createElement(components_List)}
      {/* <Route exact key="{index}" path={RoutesPage.Accordions.path} element={<Accordion/>} />
      <Route exact key="{index}" path='' element={<DashboardOverview />} /> */}
      {/* components */}
      <RouteWithSidebar exact path={RoutesPage.Accordions.path} component={Accordion} />
      <RouteWithSidebar exact path={RoutesPage.Alerts.path} component={Alerts} />
      <RouteWithSidebar exact path={RoutesPage.Badges.path} component={Badges} />
      <RouteWithSidebar exact path={RoutesPage.Breadcrumbs.path} component={Breadcrumbs} />
      <RouteWithSidebar exact path={RoutesPage.Buttons.path} component={Buttons} />
      <RouteWithSidebar exact path={RoutesPage.Forms.path} component={Forms} />
      <RouteWithSidebar exact path={RoutesPage.Modals.path} component={Modals} />
      <RouteWithSidebar exact path={RoutesPage.Navs.path} component={Navs} />
      <RouteWithSidebar exact path={RoutesPage.Navbars.path} component={Navbars} />
      <RouteWithSidebar exact path={RoutesPage.Pagination.path} component={Pagination} />
      <RouteWithSidebar exact path={RoutesPage.Popovers.path} component={Popovers} />
      <RouteWithSidebar exact path={RoutesPage.Progress.path} component={Progress} />
      <RouteWithSidebar exact path={RoutesPage.Tables.path} component={Tables} />
      <RouteWithSidebar exact path={RoutesPage.Tabs.path} component={Tabs} />
      <RouteWithSidebar exact path={RoutesPage.Tooltips.path} component={Tooltips} />
      <RouteWithSidebar exact path={RoutesPage.Toasts.path} component={Toasts} />

      {/*  */}
      

      {/* <Redirect to={RoutesPage.NotFound.path} /> */}
      {/* <Navigate to={RoutesPage.NotFound.path} /> */}
    </Routes>
  )
};
