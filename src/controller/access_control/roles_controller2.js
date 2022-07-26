// Reference from HERE
// https://github.com/vikas62081/material-table-YT/blob/serverSidePaginationSearchFilterSorting/src/App.js
import React, { useState, useEffect } from "react";
import axiosHandler from "../../utils/axiosHandler";
import { Form, Row, Col, Container } from '@themesberg/react-bootstrap';
import loggers from "../../utils/loggers";
import { MaterialTableStructure, MaterialEditCreatePage } from '../commonFunctionController'
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { Box } from '@mui/material';
import actionCreators from "../../redux_state/index";
import common_function from "../../utils/common_function";

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

const InputFieldList = (props) => {
  const { dataBeforeEditTableShow } = props.data
  const materialTableColumnData  = useSelector((state) => state.materialTableColumnData)
  const createPageFlag  = useSelector((state) => state.createPageFlag)
  const rowDataForEditCreatePage = useSelector((state) => state.rowDataForEditCreatePage)
  const tabsAndOperationData = useSelector((state) => state.tabsAndOperationData)
  loggers.logs('rolesController', 'MaterialTableDataEdit', 'InputFieldList props', JSON.stringify({ dataBeforeEditTableShow, materialTableColumnData, createPageFlag, rowDataForEditCreatePage, tabsAndOperationData, askjdhasj: 23432432 }))
  // loggers.logs('rolesController', 'MaterialTableDataEdit', 'InputFieldList props', JSON.stringify({ test: tabsAndOperationData }))

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

  const [assignedRoleData, setAssignedRoleData] = useState(JSON.parse(rowDataForEditCreatePage.rowData.permissions))
  const handleCheckFieldElement = ({ event, parent, child, flag }) => {
    const assignedRoleDataCopy = assignedRoleData
    Object.keys(assignedRoleDataCopy[parent][child]).map((key) => {
      assignedRoleDataCopy[parent][child][key] = false  
    })
    setAssignedRoleData(assignedRoleDataCopy)
    console.log('EVENET ======', event, parent, child, assignedRoleDataCopy)
  }
  const checkBoxFiledList = Object.keys(dataBeforeEditTableShow).map((parent) => {
      // const  = JSON.parse(rowDataForEditCreatePage.rowData.permissions)
      return (
          <Box key={parent} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          <Row>
            <Col key={parent} >
              <input type="checkbox" name={parent} />
              {` ${common_function.titleCase(parent.replace('_', ' '))}`}
            </Col>
          </Row>
          <Container>
            <Row>
              {
                Object.keys(dataBeforeEditTableShow[parent]).map((child) => {
                  const childFlag = assignedRoleData && assignedRoleData[parent] && assignedRoleData[parent][child] ? true : false
                  return (
                    <Col lg={4} md={4} sm={12} xs={12}  className="mb-3" key={child} >
                      <label  >
                        <input type = "checkbox" name={parent+'-'+child} 
                          defaultChecked={assignedRoleData && assignedRoleData[parent] && assignedRoleData[parent][child] ? true : false}
                          onChange={ (event) => handleCheckFieldElement({ event, parent, child, flag: childFlag })}
                        />
                        {` ${common_function.titleCase(child.replace('_', ' '))}`}
                        <br />
                      </label>
                      {
                        Object.keys(dataBeforeEditTableShow[parent][child]).map((childOperation) => {
                          return (
                            <Container key={childOperation}>
                              <label  >
                                <input type = "checkbox" name={child+'-'+childOperation} 
                                    defaultChecked={assignedRoleData && assignedRoleData[parent] && assignedRoleData[parent][child] && assignedRoleData[parent][child][childOperation] ? true : false}
                                    />
                                {` ${common_function.titleCase(childOperation.replace('_', ' '))}`}
                                <br />
                              </label>
                            </Container>
                          )
                        })
                      }
                    </Col>
                  )
                })
              }
            </Row>
          </Container>
          </Box>
      )
  });

  return (
    <>
      {returnData}
      <hr></hr>
      <h6><b>Roles List</b></h6>
      {checkBoxFiledList}
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

  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const createPageFlag  = useSelector((state) => state.createPageFlag)
  const [dataBeforeEditTableShow, setDataBeforeEditTableShow] = useState({})
  const fetchRequireData = async () => {
    const dataBeforeEditTableShowRes = await axiosHandler.request({ method: 'POST', requestUrl: 'http://localhost:8082/roles/get_tab_operation_data' })
    loggers.logs('rolesController', 'MaterialTableDataEdit', 'dataBeforeEditTableShowRes', JSON.stringify(dataBeforeEditTableShowRes))
    setDataBeforeEditTableShow({ ...dataBeforeEditTableShowRes.data.data })
  }
  useEffect(()=>{
    fetchRequireData()
  }, [])

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

  const inputFields = <Row> 
    <InputFieldList data={{ dataBeforeEditTableShow }} />
  </Row>

  return ( 
    < MaterialEditCreatePage data={{ handleSubmit, inputFields }}></MaterialEditCreatePage>  
  );
};

export {
  MaterialTableConfig, MaterialTableDataEdit
}