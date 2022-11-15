// Reference from HERE
// https://github.com/vikas62081/material-table-YT/blob/serverSidePaginationSearchFilterSorting/src/App.js
import React, { useState, useEffect, useRef } from "react";
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
  loggers.logs('rolesController1.js', 'MaterialTableConfig', 'props', JSON.stringify(props))
  return (
    <MaterialTableStructure data={{ ...props }}/>
  );
};

/**
 * Description: Use As a Component ************************
 * @param {{ data: { updateUrl: String, createUrl: String } }} }} props
 * @returns {Promise <{ EditCreatePage: {} }>} 
 */
const MaterialTableDataEdit = (props) => {
  loggers.logs('rolesController', 'MaterialTableDataEdit', 'props', JSON.stringify(props))

  // Redux
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const createPageFlag  = useSelector((state) => state.createPageFlag)

  // Fetch require data before go to edit/create page
  const [dataBeforeEditTableShow, setDataBeforeEditTableShow] = useState(null) // State variable for fetch require data before go to edit/create page
  const [inputFields, setInputFields] = useState(null)
  const fetchRequireData = async () => {
    const dataBeforeEditTableShowRes = await axiosHandler.request({ method: 'POST', requestUrl: 'http://localhost:8082/roles/get_tab_operation_data' })
    loggers.logs('rolesController', 'MaterialTableDataEdit', 'dataBeforeEditTableShowRes', JSON.stringify(dataBeforeEditTableShowRes))
    setDataBeforeEditTableShow({ ...dataBeforeEditTableShowRes.data.data })
    const data = <Row> 
      <InputFieldList data={{ dataBeforeEditTableShow: dataBeforeEditTableShowRes.data.data }} />
    </Row>
    setInputFields(data)
  }
  useEffect(()=>{
    fetchRequireData()
  }, [])

  // After submit
  const handleSubmit = async (e, setErrorSuccessMsg) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formObject = Object.fromEntries(formData.entries());
    loggers.logs('rolesController', 'MaterialTableDataEdit', 'formObject', JSON.stringify(formObject))

    const updateRoleData = await axiosHandler.request({ method: 'POST', requestUrl: `${(createPageFlag) ? props.data.createUrl : props.data.updateUrl}`, data: formObject })
    loggers.logs('rolesController', 'MaterialTableDataEdit', 'updateRoleData', JSON.stringify(updateRoleData))
    if (updateRoleData.data.status === 200 ) {
      actions.showEditCreatePageFlag(false) 
      actions.createPageFlag(false)
      setErrorSuccessMsg({ flag: false, message: '', type: '' })
    }
    setErrorSuccessMsg({ flag: true, message:  updateRoleData && updateRoleData.data && updateRoleData.data.message ? updateRoleData.data.message : 'Something Went Wrong!', type: 'danger' })
  };

  return ( 
    <>
      {
        dataBeforeEditTableShow && inputFields ?
        < MaterialEditCreatePage data={{ handleSubmit, inputFields }} /> :
        <></>
      }
    </>
  );
};

/**
 * Description: Use As a Component for InputFieldList component ************************
 * @param {{ baseUrl: string }} props
 * @returns {Promise <{ MaterialTableWithData: {} }>} 
 */
 const CheckBoxList = props => {
  return (
    <>
      <input
        key={props.data.key}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.data.val}
        value={props.data.key}
      />{" "}
      {props.data.key}
    </>
  );
};

const InputFieldList = (props) => {
  const { dataBeforeEditTableShow } = props.data

  // Redux
  const materialTableColumnData  = useSelector((state) => state.materialTableColumnData)
  const createPageFlag  = useSelector((state) => state.createPageFlag)
  const rowDataForEditCreatePage = useSelector((state) => state.rowDataForEditCreatePage)
  const tabsAndOperationData = useSelector((state) => state.tabsAndOperationData)
  loggers.logs('rolesController', 'MaterialTableDataEdit', 'InputFieldList props', JSON.stringify({ dataBeforeEditTableShow, materialTableColumnData, createPageFlag, rowDataForEditCreatePage, tabsAndOperationData }))

  // Input box fields
  const returnData = materialTableColumnData[0].columnData.map(function(key) {
    let value = rowDataForEditCreatePage && rowDataForEditCreatePage.rowData && rowDataForEditCreatePage.rowData[key.field] ? rowDataForEditCreatePage.rowData[key.field] : {}
    let inputField;
    if (('lookup' in key && typeof key.lookup === 'object')) {
      inputField = <Form.Select name={key.field} { ...(createPageFlag ? {} : { defaultValue : value }) } >
                    { Object.keys(key.lookup).map((objetcKey) => { 
                        return ( <option key={objetcKey} value={objetcKey} >{key.lookup[objetcKey]}</option>) 
                      })
                    }
                  </Form.Select>
    } else {
      inputField = <Form.Control type="text" name={key.field} 
                        {...(createPageFlag ? {} : 'readOnly' in key && key.readOnly === true ? { readOnly: true, value: value } : { defaultValue: value })} />
    }

    return (<Col lg={6} md={4} sm={12} xs={12}  className="mb-3" key={`${key.field}Col`} >
              <Form.Group >
                <Form.Label >{key.title}</Form.Label>
                  {inputField}
                </Form.Group>
            </Col>)
  });

  // Initialize data for checkbox fileds
  const stateData = Object.assign(dataBeforeEditTableShow, JSON.parse(rowDataForEditCreatePage.rowData.permissions))
  const [ state, setState ] = useState(stateData)
  const handleAllCheckedParent = ({event, parent = null, child = null, childOperation = null, flag}) => { 
    loggers.logs('rolesController', 'handleAllCheckedParent', 'request', {event, parent, child, childOperation, flag})
    // event.persist();
    const dataState = state
    if (childOperation) dataState[parent][child][childOperation] = !flag
    else if (child) {
      Object.keys(dataState[parent][child]).map((key) => {
        dataState[parent][child][key] = !flag
      })
    } 
    else if (parent) {
      Object.keys(dataState[parent]).map((key) => {
        Object.keys(dataState[parent][key]).map((key1) => {
          dataState[parent][key][key1] = !flag
        })
      })
    }
    setState({ ...dataState})
  }

  // Checkbox fileds
  const checkBoxFiledList = Object.keys(state).map((parent) => {
    const areAllTrue = Object.values(state[parent]).every((key) => {
      return Object.values(key).every((key1) => { return key1 === true })
    })
    return (
        <Box key={parent} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <Row>
          <Col key={parent} >
            <input key={parent} type="checkbox" onClick={(event) => handleAllCheckedParent({event, parent, flag: areAllTrue})} value="checkedall" checked={areAllTrue}/>
            {` ${common_function.titleCase(parent.replace('_', ' '))}`}
          </Col>
        </Row>
        <Container>
          <Row>
            {
              Object.keys(state[parent]).map((child) => {
                const areAllTrue = Object.values(state[parent][child]).every( value => value === true )
                return (
                  <Col lg={4} md={4} sm={12} xs={12}  className="mb-3" key={child} >
                    <label  >
                      <input type="checkbox" onClick={(event) => handleAllCheckedParent({event, parent, child, flag: areAllTrue})} value={child} checked={areAllTrue}/>
                      {` ${common_function.titleCase(child.replace('_', ' '))}`}
                      <br />
                    </label>
                    {
                      Object.keys(state[parent][child]).map((childOperation) => {
                        return (
                          <Container key={childOperation}>
                            <CheckBoxList
                              handleCheckChieldElement={(event) => handleAllCheckedParent({event, parent, child, childOperation, flag: state[parent][child][childOperation]})}
                              data={{ key: childOperation, val: state[parent][child][childOperation]}}
                            />
                          </Container>
                        );
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
      { checkBoxFiledList }
      <Form.Control type="hidden" name="rolesPermissions" value={JSON.stringify(state)}/>
    </>
  )
}

export {
  MaterialTableConfig, MaterialTableDataEdit
}