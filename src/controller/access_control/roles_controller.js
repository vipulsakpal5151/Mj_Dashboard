// Reference from HERE
// https://github.com/vikas62081/material-table-YT/blob/serverSidePaginationSearchFilterSorting/src/App.js
import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import axiosHandler from "../../utils/axiosHandler";
import { Form, Row, Col, Card, Button, Container } from '@themesberg/react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import common_function from "../../utils/common_function";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"

// As a component
const MaterialTableConfig = (props) => {
  console.log('PROPS++++++++++++++', props)
  const defaultMaterialTheme = createTheme({
    palette: {
      primary: {
        main: '#4A16DA',
        contrastText: 'white',
      },
    },
  });
  const { columnsData, baseUrl } = props
  // const navigate = useNavigate();
  let actionData = [] 
  if (columnsData && columnsData[0] && columnsData[0].columnData) {
    columnsData[0].tableAction.map((lists, index ) => {
      const dataForAction = {
        icon: lists,
        tooltip: `${lists} User`,
        onClick: (event, rowData) => {
          console.log({ event, rowData })
          props.data.setDataForEditPage({ event, rowData })
          props.data.setShowFlag(true)
          // navigate('/transactions', { state: { event, rowData } })
        }
      }
      actionData.push(dataForAction)
    })
  }
  return (

    <Card>
    <Card.Header as="h5">
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}  className="mb-3">
          {/* <b>{((window.location.pathname.split("/")[1]).replace("_", " ")).toUpperCase()} TABLE</b> */}
          <b>{
              window.location.pathname.split("/").map((lists, key) => {
                if (lists) {
                  return `${common_function.titleCase(lists.replace("_", " "))} ${key >= (window.location.pathname.split("/").length)-1 ? '' : ' > '}`
                }
              })
            } Table</b>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
    <Row>
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        actions={actionData}
        title="Olympic Data"
        columns={columnsData && columnsData[0] && columnsData[0].columnData ? columnsData[0].columnData : []}
        options={{ debounceInterval: 700, padding: "dense", filtering: true, pageSize: 5 }}
        data= {async (query) => {
          try {
            console.log('MaterialTableConfig.js : MaterialTableConfig: query : ', query)
            // prepare your data and then call resolve like this:
            let url = `${baseUrl}?`
            //searching
            if (query.search) url += `q=${query.search}`

            //sorting 
            if (query.orderBy) url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`

            //filtering
            if (query.filters.length) {
              const filter = query.filters.map(filter => {
                return `&${filter.column.field}${filter.operator}${filter.value}`
              })
              url += filter.join('')
            }
            //pagination
            url += `&_page=${query.page + 1}`
            url += `&_limit=${query.pageSize}`

            // fetch Table data
            const tableData = await axiosHandler.request({ method: 'GET', requestUrl: url})
            console.log('MaterialTableConfig.js : MaterialTableConfig: tableData : ', tableData)
            console.log('MaterialTableConfig.js : MaterialTableConfig: tableData : ', tableData.headers['x-total-count'])
            if (tableData && tableData.data && tableData.data.length > 0) {
              return { data: tableData.data, page: query.page, totalCount: parseInt(tableData.headers['x-total-count']) }
            }
            return { data: [], page: query.page, totalCount: 0 }
          } catch (error) {
            console.log('MaterialTableConfig.js : MaterialTableConfig : error : ', error)
            return {
              data: [], page: query.page, totalCount: 0
            }
          }
          }
        }
      />
    </ThemeProvider>
    </Row>
    </Card.Body>
    </Card>
    
  );
};

/**
 * Desciption : Use as a function. Fetch data for material table columns with additional data
 * @returns 
 */
const materialTableColumnData = async (columnDataUrl) => {
  try {
    const fetchData = await axiosHandler.request({ method: 'GET', requestUrl: columnDataUrl })
    console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', fetchData)
    if (fetchData && fetchData.data && fetchData.data.length > 0) return fetchData.data
    return []
  } catch (error) {
    console.log('MaterialTableConfig.js : materialTableColumnData : error : ', error)
    return []
  }
};

/**
 * Description : Use As a component. hide when MaterialTable.showFlag (useState) FALSE
 * @param {*} props 
 * @returns 
 */
const MaterialTableDataEdit = (props) => {
    // Fetch data from props
    const { setShowFlag, setDataForEditPage, dataForEditPage, columnsData, updateUrl} = props.data
    console.log('MaterialTableDataEdit: +++', { setDataForEditPage, dataForEditPage, columnsData: columnsData[0].columnData })

    // Function for hide MaterialTableDataEdit component. MaterialTable.showFlag (useState)
    const showTableData = () => {
      setShowFlag(false)
    }

    const [ assignData, setAssignData ] = useState(dataForEditPage.rowData.assign)
    let tabsAndOperationData = useSelector((state) => state.tabsAndOperationData)
    
    const handleCheckBoxChildChange = (fields) => {
        const setData = tabsAndOperationData
        if ('childOperationKey' in fields) {
            setData[fields.parentKey][fields.childKey].operation[fields.childOperationKey] = !setData[fields.parentKey][fields.childKey].operation[fields.childOperation]
        } else {
            setData[fields.parentKey][fields.childKey].flag = !setData[fields.parentKey][fields.childKey].flag
        }
        setAssignData(setData)
    };


    const checkBoxFiledList = Object.keys(tabsAndOperationData).map(function(parent) {
        return (
            <Box key={parent} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <label  key={parent}>{common_function.titleCase(parent.replace('_', ' '))}</label>
            <Container>
            <Row>
            {
                Object.keys(tabsAndOperationData[parent]).map(function(child) {
                    const childFlag =  (parent in assignData && child in assignData[parent] && 'flag' in assignData[parent][child]) ? assignData[parent][child].flag : false
                    tabsAndOperationData[parent][child].flag = childFlag
                    return (
                        <Col lg={4} md={4} sm={12} xs={12}  className="mb-3" key={child} >
                            <label  >
                                {`${child} `}
                                <input type = "checkbox" name={parent+'-'+child} 
                                    defaultChecked={childFlag}
                                    onChange = {(event) => handleCheckBoxChildChange({ parentKey: parent, childKey: child, flag: !childFlag, event})}
                                    />
                                <br />
                            </label>
                            {
                                Object.keys(tabsAndOperationData[parent][child].operation).map(function(childOperation) {
                                    const operationFlag =  (parent in assignData && child in assignData[parent] && 'operation' in assignData[parent][child]) && childOperation in assignData[parent][child].operation ? assignData[parent][child].operation[childOperation] : false
                                    tabsAndOperationData[parent][child].operation[childOperation] = operationFlag
                                    return (
                                        <Container key={childOperation}>
                                            <label  >
                                                {`${childOperation} `}
                                                <input type = "checkbox" name={child+'-'+childOperation} 
                                                    defaultChecked={operationFlag}
                                                    onChange = {(event) => handleCheckBoxChildChange({ parentKey: parent, childKey: child, childOperationKey: childOperation, flag: !operationFlag, event})}
                                                    />
                                                <br />
                                            </label>
                                            {
                                                
                                            }
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

    const inputFiledList = columnsData[0].columnData.map(function(key, index) {
        const label = key.title
        const value = dataForEditPage.rowData[key.field]
        if (key.field !== 'id') {
            return (<Col lg={6} md={4} sm={12} xs={12}  className="mb-3" key={`${key.field}Col`} >
                  <Form.Group >
                    <Form.Label >{label}</Form.Label>
                    <Form.Control type="text" name={key.field} defaultValue={value} />
                  </Form.Group>
                </Col>)
        }
    });

    const handleSubmit = async (e, actions) => {
      e.preventDefault();
      const formData = {}
      columnsData[0].columnData.map(function(key) {
        return formData[key.field] = e.target[key.field].value
      });
      console.log('Signin.js : handleSubmit : e : ', { e: e.target, formData, id: dataForEditPage.rowData.id })
      const fetchData = await axiosHandler.request({ method: 'PUT', requestUrl: `${updateUrl}/${dataForEditPage.rowData.id}`, data: formData })
      console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', fetchData)
      setShowFlag(false)
    };

    return (
      <Card>
      <Card.Header as="h5">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}  className="mb-3">
            <b>{
              window.location.pathname.split("/").map((lists, key) => {
                if (lists) {
                  return `${common_function.titleCase(lists.replace("_", " "))} ${key >= (window.location.pathname.split("/").length)-1 ? '' : ' > '}`
                }
              })
            } Edit</b>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12} className="text-end mb-3">
            <p variant="secondary" size="sm" className="text-info" onClick={showTableData}><b>{'<< '}Go Back</b></p>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
      <Row>
      <Form className="mb-12 editFormData" onSubmit={handleSubmit}>
        <Row>
          <h6><b>Roles Description</b></h6>
          {inputFiledList}
          <hr></hr>
          <h6><b>Roles List</b></h6>
          {checkBoxFiledList}
        </Row>
        <hr />
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}  className="mb-3">
            <Button variant="success" type="submit" className="m-1">Success</Button>
          </Col>
        </Row>
      </Form>
      </Row>
      </Card.Body>
      </Card>
    );
};

const fetchAnyData = async (url) => {
    try {
        const fetchData = await axiosHandler.request({ method: 'GET', requestUrl: url })
        console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', fetchData)
        if (fetchData && fetchData.data && fetchData.data.length > 0) return fetchData.data
        return [{}]
    } catch (error) {
        console.log('MaterialTableConfig.js : materialTableColumnData : error : ', error)
        return [{}]
    }
}

export {
  MaterialTableConfig, materialTableColumnData, MaterialTableDataEdit
}