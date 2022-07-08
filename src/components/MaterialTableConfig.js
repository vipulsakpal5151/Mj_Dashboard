// Reference from HERE
// https://github.com/vikas62081/material-table-YT/blob/serverSidePaginationSearchFilterSorting/src/App.js
import React from "react";
import MaterialTable from 'material-table'
import axiosHandler from "../utils/axiosHandler";
import { Form, Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
          <b>{((window.location.pathname.split("/")[1]).replace("_", " ")).toUpperCase()} TABLE</b>
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
const materialTableColumnData = async () => {
  try {
    const fetchData = await axiosHandler.request({ method: 'GET', requestUrl: 'http://localhost:3004/olympicTableData'})
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
  try {
    // Fetch data from props
    const { setShowFlag, setDataForEditPage, dataForEditPage, columnsData } = props.data
    console.log({ setDataForEditPage, dataForEditPage, columnsData: columnsData[0].columnData })

    // Function for hide MaterialTableDataEdit component. MaterialTable.showFlag (useState)
    const showTableData = () => {
      setShowFlag(false)
    }

    // Create Input Fileds list. Using MaterialTable.columnsData and MaterialTable.dataForEditPage
    const inputFiledList = columnsData[0].columnData.map(function(key, index) {
      const label = key.title
      const value = dataForEditPage.rowData[key.field]
      return (<Col lg={6} md={4} sm={12} xs={12}  className="mb-3" key={`${key.field}Col`} >
                <Form.Group >
                  <Form.Label >{label}</Form.Label>
                  <Form.Control type="text" name={key.field} defaultValue={value} />
                </Form.Group>
              </Col>)
    });

    const handleSubmit = async (e, actions) => {
      e.preventDefault();
      const formData = {}
      columnsData[0].columnData.map(function(key) {
        return formData[key.field] = e.target[key.field].value
      });
      console.log('Signin.js : handleSubmit : e : ', { e: e.target, formData, id: dataForEditPage.rowData.id })
      const fetchData = await axiosHandler.request({ method: 'PUT', requestUrl: `http://localhost:3004/olympic/${dataForEditPage.rowData.id}`, data: formData })
      console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', fetchData)
      setShowFlag(false)
    };

    return (
      <Card>
      <Card.Header as="h5">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}  className="mb-3">
            <b>EDIT {((window.location.pathname.split("/")[1]).replace("_", " ")).toUpperCase()}</b>
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
          {inputFiledList}
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
  } catch (error) {
    console.log('MaterialTableConfig.js : materialTableColumnData : error : ', error)
    return (<></>)
  }
};

export {
  MaterialTableConfig, materialTableColumnData, MaterialTableDataEdit
}