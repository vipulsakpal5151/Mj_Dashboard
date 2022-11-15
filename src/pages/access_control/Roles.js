import React from "react";
import { MaterialTableConfig, MaterialTableDataEdit } from "../../controller/access_control/roles_controller1"
import request from '../../utils/request.js'
import { useSelector } from "react-redux"

export default () => {
  // Set URL's for material table
  const url = request.access_control.roles.viewUrl;
  const columnDataUrl = request.access_control.roles.fetchColumnDataUrl;
  const updateUrl = request.access_control.roles.updateUrl
  const createUrl = request.access_control.roles.createUrl

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
