// Reference from HERE
// https://github.com/vikas62081/material-table-YT/blob/serverSidePaginationSearchFilterSorting/src/App.js
import React, { useState, useEffect } from "react";
import axiosHandler from "../../utils/axiosHandler";
import { Form, Row, Col } from '@themesberg/react-bootstrap';
import loggers from "../../utils/loggers";
import { MaterialTableStructure, MaterialEditCreatePage } from '../commonFunctionController'
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import actionCreators from "../../redux_state/index";

/**
 * Description: Use As a Component ************************
 * @param {{ baseUrl: string }} props
 * @returns {Promise <{ MaterialTableWithData: {} }>} 
 */
const MaterialTableConfig = (props) => {
  loggers.logs('rolesController', 'MaterialTableConfig', 'props', JSON.stringify(props))
  return (
    <MaterialTableStructure data={{ ...props }}/>
  );
};

const inputFiledList = ({ materialTableColumnData, dataBeforeEditTableShow, createPageFlag, rowDataForEditCreatePage, tabsAndOperationData }) => {
  loggers.logs('rolesController', 'inputFiledList', 'createPageFlag', JSON.stringify({ materialTableColumnData, dataBeforeEditTableShow, createPageFlag, rowDataForEditCreatePage, tabsAndOperationData }))
  loggers.logs('rolesController', 'inputFiledList', 'createPageFlag1', JSON.parse(rowDataForEditCreatePage.rowData.permissions))
  const returnData = materialTableColumnData[0].columnData.map(function(key, index) {
    const label = key.title
    // const rowDataForEditCreatePage = useSelector((state) => state.rowDataForEditCreatePage)
    let value = rowDataForEditCreatePage && rowDataForEditCreatePage.rowData && rowDataForEditCreatePage.rowData[key.field] ? rowDataForEditCreatePage.rowData[key.field] : {}
    let inputField;
    if (('lookup' in key && typeof key.lookup === 'object')) {
      inputField = <Form.Select name={key.field} { ...(createPageFlag ? {} : { defaultValue : value }) } >
                    { Object.keys(key.lookup).map((objetcKey) => { 
                        return ( <option key={objetcKey} value={objetcKey} >{key.lookup[objetcKey]}</option>) 
                      })
                    }
                  </Form.Select>
    } else if (key.field in dataBeforeEditTableShow) {
      const selectDafaultValue = dataBeforeEditTableShow[key.field].find(o => o.optionDetails === value)
      value = selectDafaultValue && selectDafaultValue.optionValue ? selectDafaultValue.optionValue : value
      inputField = <Form.Select name={key.field} { ...(createPageFlag ? {} : { defaultValue : value }) } >
                    { 
                      dataBeforeEditTableShow[key.field].map((objetcKey) => {
                        return (
                          <option key={objetcKey.optionValue} value={objetcKey.optionValue} >{objetcKey.optionDetails}</option>
                        )
                      })
                    }
                  </Form.Select>
    } else {
      inputField = <Form.Control type="text" name={key.field} 
                        {...(createPageFlag ? {} : 'readOnly' in key && key.readOnly === true ? { readOnly: true, value: value } : { defaultValue: value })} />
    }

    return (<Col lg={6} md={4} sm={12} xs={12}  className="mb-3" key={`${key.field}Col`} >
              <Form.Group >
                <Form.Label >{label}</Form.Label>
                  {inputField}
                </Form.Group>
            </Col>)
  });
  return (
    <>
      {returnData}
    </>
  )
}

/**
 * Description: Use As a Component ************************
 * @param {{ data: { updateUrl: String } }} }} props
 * @returns {Promise <{ EditCreatePage: {} }>} 
 */
const MaterialTableDataEdit = (props) => {
  loggers.logs('rolesController', 'MaterialTableDataEdit', 'props', JSON.stringify(props))

  // Redux
  const materialTableColumnData  = useSelector((state) => state.materialTableColumnData)
  const createPageFlag  = useSelector((state) => state.createPageFlag)
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const rowDataForEditCreatePage = useSelector((state) => state.rowDataForEditCreatePage)
  const tabsAndOperationData = useSelector((state) => state.tabsAndOperationData)
  loggers.logs('rolesController', 'MaterialTableDataEdit', 'tabsAndOperationData', JSON.stringify(tabsAndOperationData))

  // State : fetch some required data before showing EditCreatePage
  const [dataBeforeEditTableShow, setDataBeforeEditTableShow] = useState({})
  const fetchRequireData = async () => {
    const dataBeforeEditTableShowRes = await axiosHandler.request({ method: 'POST', requestUrl: 'http://localhost:8082/roles/get_tab_operation_data' })
    loggers.logs('rolesController', 'MaterialTableDataEdit', 'dataBeforeEditTableShowRes', JSON.stringify(dataBeforeEditTableShowRes))
    setDataBeforeEditTableShow({ ...dataBeforeEditTableShowRes.data.data })
  }
  useEffect(()=>{
    fetchRequireData()
  }, [])

  try {
    // Function for hide MaterialTableDataEdit component. MaterialTable.showFlag (useState)
    const handleSubmit = async (e, setErrorSuccessMsg) => {
      e.preventDefault();
      var formData = new FormData(e.target);
      let formObject = Object.fromEntries(formData.entries());
      loggers.logs('rolesController', 'MaterialTableDataEdit', 'formObject', JSON.stringify(formObject))

      const updateUserData = await axiosHandler.request({ method: 'POST', requestUrl: `${(createPageFlag) ? props.data.createUrl : props.data.updateUrl}`, data: formObject })
      loggers.logs('rolesController', 'MaterialTableDataEdit', 'updateUserData', JSON.stringify(updateUserData))
      if (updateUserData.data.status === 200 ) {
        actions.showEditCreatePageFlag(false) 
        actions.createPageFlag(false)
        setErrorSuccessMsg({ flag: false, message: '', type: '' })
      }
      setErrorSuccessMsg({ flag: true, message:  updateUserData && updateUserData.data && updateUserData.data.message ? updateUserData.data.message : 'Something Went Wrong!', type: 'danger' })
    };

    const inputFields = <Row> {inputFiledList({ materialTableColumnData, dataBeforeEditTableShow, createPageFlag, rowDataForEditCreatePage, tabsAndOperationData })} </Row>

    return ( 
      < MaterialEditCreatePage data={{ handleSubmit, inputFields }}></MaterialEditCreatePage>  
    );
  } catch (error) {
    loggers.logs('rolesController', 'MaterialTableDataEdit', 'error', JSON.stringify(error))
    return (<></>)
  }
};

export {
  MaterialTableConfig, MaterialTableDataEdit
}