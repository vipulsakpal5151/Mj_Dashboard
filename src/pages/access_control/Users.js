import React from "react";
import { MaterialTableConfig, MaterialTableDataEdit } from "../../controller/access_control/userController";
import request from '../../utils/request.js'
import { useSelector } from "react-redux"
// import loggers from "../utils/loggers";
// import { bindActionCreators } from "redux"
// import actionCreators from "../redux_state/index";

export default () => {
  // Set URL's for material table
  const url = request.access_control.users.viewUrl;
  const columnDataUrl = request.access_control.users.fetchColumnDataUrl;
  const updateUrl = request.access_control.users.updateUrl
  const createUrl = request.access_control.users.createUrl

  console.log('showEditCreatePageFlag', useSelector((state) => state.showEditCreatePageFlag))
  return (
    <>
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          { 
            !useSelector((state) => state.showEditCreatePageFlag) ? 
            <MaterialTableConfig baseUrl={url} columnDataUrl={columnDataUrl} /> : 
            <MaterialTableDataEdit data={{ updateUrl, createUrl }} /> 
          }
      </div>
    </>
  );
};
