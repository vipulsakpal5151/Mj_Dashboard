import React, { useEffect, useState } from "react";
import { MaterialTableConfig, materialTableColumnData, MaterialTableDataEdit } from "../controller/access_control/userController";
import request from '../utils/request.js'
import loggers from "../utils/loggers";

export default () => {
  const url = request.access_control.users.viewUrl;
  const columnDataUrl = request.access_control.users.fetchColumnDataUrl;
  
  const [showFlag, setShowFlag] = useState(false)
  const [dataForEditPage, setDataForEditPage] = useState({})

  const [columnsData, setColumnsData] = useState([])
  const fetchColumnData = async () => {
    const materialTableColumnDataRes = await materialTableColumnData(columnDataUrl)
    loggers.logs('Users.js', 'Users', 'materialTableColumnDataRes', JSON.stringify(materialTableColumnDataRes))
    setColumnsData(materialTableColumnDataRes)
  }
  useEffect(()=>{
    fetchColumnData()
  }, [])

  return (
    <>
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          { 
            !showFlag ? 
            <MaterialTableConfig columnsData={columnsData} baseUrl={url} data={{ setShowFlag, setDataForEditPage, dataForEditPage }} /> : 
            <MaterialTableDataEdit data={{ setShowFlag, setDataForEditPage, dataForEditPage, columnsData, updateUrl: request.access_control.users.updateUrl }} /> 
          }
      </div>
    </>
  );
};
