import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import componentsList from './componentsList';
import dashboardController, { ProtectedRoute, RouteWithLoader, RouteWithSidebar, CheckAlredyLoginOrNot } from '../controller/dashboard/dashboardController'
import actionCreators from "../redux_state/index";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux"
import loggers from '../utils/loggers';


export default () => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const sideBar  = useSelector((state) => state.userPermissions)
  const [ sideBarFlag, setSideBarFlag ] = useState(true)
  loggers.logs('HomePage1.js', 'HomePage1', 'sideBar', JSON.stringify(sideBar))
  const fetchColumnData = async () => {
    const getUserpermission = await dashboardController.getUserpermission()
    if (getUserpermission.status === 200) {
      actions.userPermissions(getUserpermission.data)
    }
  }
  useEffect(()=>{
    fetchColumnData()
  }, [sideBarFlag])
  loggers.logs('HomePage1.js', 'HomePage1', 'sideBar22', JSON.stringify(sideBar))
  const components_List = componentsList.componentListForRoutes.map((lists, index ) => {
    const com = componentsList[lists.component]
    if (lists.parent in sideBar && lists.child in sideBar[lists.parent]) sideBar[lists.parent][lists.child].component = lists.component
    // console.log('Lists =====', (lists.parent !== 'singleWithParent' ? lists.parent in sideBar : false))
    if (lists.parent === 'singleWithParent' || (lists.parent in sideBar && lists.child in sideBar[lists.parent] && sideBar[lists.parent][lists.child].flag === true)) {
      if (lists.with === 'RouteWithLoader') {
        return <Route exact key={index} path={lists.path} element={
          <CheckAlredyLoginOrNot>
            <RouteWithLoader Component={com}/>
          </CheckAlredyLoginOrNot>
        } />
      }
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
