import React, { useEffect, useState } from "react";
import { MaterialTableConfig, materialTableColumnData, MaterialTableDataEdit } from "../components/MaterialTableConfig";

export default () => {
  const url = "http://localhost:3004/olympic";
  const columnDataUrl = "http://localhost:3004/olympicTableData";
  const [columnsData, setColumnsData] = useState([])
  const [showFlag, setShowFlag] = useState(false)
  const [dataForEditPage, setDataForEditPage] = useState({})
  const fetchColumnData = async () => {
    setColumnsData(await materialTableColumnData(columnDataUrl))
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
            <MaterialTableDataEdit data={{ setShowFlag, setDataForEditPage, dataForEditPage, columnsData, updateUrl: 'http://localhost:3004/olympic' }} /> 
          }
      </div>
    </>
  );
};
