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
  loggers.logs('userController', 'MaterialTableConfig', 'props', JSON.stringify(props))

  // Redux
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const materialTableColumnData  = useSelector((state) => state.materialTableColumnData)
  loggers.logs('userController', 'MaterialTableConfig', 'materialTableColumnData', JSON.stringify(materialTableColumnData))

  // actionData for:  Material table action column. Like edit, view, delete
  let actionData = [] 
  if (materialTableColumnData && materialTableColumnData[0] && materialTableColumnData[0].columnData) {
    materialTableColumnData[0].tableAction.map((lists) => {
          const dataForAction = {
              icon: lists,
              tooltip: `${lists} User`,
              onClick: (event, rowData) => {
                event.preventDefault();
                console.log({ event, rowData })
                actions.showEditCreatePageFlag(true)
                actions.rowDataForEditCreatePage({ event, rowData })
              }
          }
          actionData.push(dataForAction)
      })
  }

  return (
    <MaterialTableStructure data={{ ...props, actionData }}/>
  );
};

const inputFiledList = ({ materialTableColumnData, dataBeforeEditTableShow, createPageFlag }) => {
  loggers.logs('userController', 'inputFiledList', 'createPageFlag', createPageFlag)
  return materialTableColumnData[0].columnData.map(function(key, index) {
    const label = key.title
    const rowDataForEditCreatePage = useSelector((state) => state.rowDataForEditCreatePage)
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
}

/**
 * Description: Use As a Component ************************
 * @param {{ data: { updateUrl: String } }} }} props
 * @returns {Promise <{ EditCreatePage: {} }>} 
 */
const MaterialTableDataEdit = (props) => {
  loggers.logs('userController', 'MaterialTableDataEdit', 'props', JSON.stringify(props))

  // Redux
  const materialTableColumnData  = useSelector((state) => state.materialTableColumnData)
  const createPageFlag  = useSelector((state) => state.createPageFlag)
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)

  // State : fetch some required data before showing EditCreatePage
  const [dataBeforeEditTableShow, setDataBeforeEditTableShow] = useState({})
  const fetchRequireData = async () => {
    const dataBeforeEditTableShowRes = await axiosHandler.request({ method: 'POST', requestUrl: 'http://localhost:8082/roles/roles_details' })
    loggers.logs('userController', 'MaterialTableDataEdit', 'dataBeforeEditTableShowRes', JSON.stringify(dataBeforeEditTableShowRes))
    setDataBeforeEditTableShow({ role_name: dataBeforeEditTableShowRes.data.role_details })
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
      loggers.logs('userController', 'MaterialTableDataEdit', 'formObject', JSON.stringify(formObject))

      const updateUserData = await axiosHandler.request({ method: 'POST', requestUrl: `${(createPageFlag) ? props.data.createUrl : props.data.updateUrl}`, data: formObject })
      loggers.logs('userController', 'MaterialTableDataEdit', 'updateUserData', JSON.stringify(updateUserData))
      if (updateUserData.data.status === 200 ) {
        actions.showEditCreatePageFlag(false) 
        actions.createPageFlag(false)
        setErrorSuccessMsg({ flag: false, message: '', type: '' })
      }
      setErrorSuccessMsg({ flag: true, message:  updateUserData && updateUserData.data && updateUserData.data.message ? updateUserData.data.message : 'Something Went Wrong!', type: 'danger' })
    };

    const inputFields = <Row> {inputFiledList({ materialTableColumnData, dataBeforeEditTableShow, createPageFlag })} </Row>

    return ( 
      < MaterialEditCreatePage data={{ handleSubmit, inputFields }}></MaterialEditCreatePage>  
    );
  } catch (error) {
    loggers.logs('userController', 'MaterialTableDataEdit', 'error', JSON.stringify(error))
    return (<></>)
  }
};

export {
  MaterialTableConfig, MaterialTableDataEdit
}