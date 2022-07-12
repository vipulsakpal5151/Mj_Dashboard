import React, { useEffect, useState } from "react";
import { MaterialTableConfig, materialTableColumnData, MaterialTableDataEdit } from "../controller/access_control/roles_controller"

/**
 * Note: 1. Pass roles assign object with Material Table Data
 *       2. 
 */
export default () => {
  const url = "http://localhost:3004/roles";  // Url for Material Table data
  const columnDataUrl = "http://localhost:3004/rolesTableData"; // Url for Material Column Heading Data
  const updateUrl = "http://localhost:3004/roles"; // Url for Material data edit page form tag
  
  const [showFlag, setShowFlag] = useState(false)
  const [dataForEditPage, setDataForEditPage] = useState({})

  // fetching column data for Material Table Columns and fecth action array (e.g = edit, show, create) 
  const [columnsData, setColumnsData] = useState([])
  const fetchColumnData = async () => setColumnsData(await materialTableColumnData(columnDataUrl))
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
            <MaterialTableDataEdit data={{ setShowFlag, setDataForEditPage, dataForEditPage, columnsData, updateUrl }} /> 
          }
      </div>
    </>
  );
};
