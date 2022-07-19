// Reference from HERE
// https://github.com/vikas62081/material-table-YT/blob/serverSidePaginationSearchFilterSorting/src/App.js
import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import { Row, Col, Card, Form, Button, Alert, FontAwesomeIcon } from '@themesberg/react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosHandler from "../../src/utils/axiosHandler";
import common_function from "../../src/utils/common_function";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import actionCreators from "../redux_state/index";

/**
 * Description: Use As a Function
 * @param { columnDataUrl: string } columnDataUrl
 * @returns {Promise <{ materialTableColumnData: [] }>} 
 */
 const materialTableColumnData1 = async (columnDataUrl) => {
    try {
        const fetchData = await axiosHandler.request({ method: 'POST', requestUrl: columnDataUrl })
        console.log('MaterialTableConfig.js : materialTableColumnData: fetchData : ', fetchData.data)
        if (fetchData && fetchData.data) return fetchData.data.fetchColumnData
        return []
    } catch (error) {
        console.log('MaterialTableConfig.js : materialTableColumnData : error : ', error)
        return []
    }
};

const MaterialTableStructure = (props) => {
    // Redux
    const dispatch = useDispatch()
    const actions = bindActionCreators(actionCreators, dispatch)

    const { baseUrl, actionData, columnDataUrl } = props.data
    const materialTableColumnData  = useSelector((state) => state.materialTableColumnData)
    // Create Theme For Material Table
    const defaultMaterialTheme = createTheme({
        palette: {
        primary: {
            main: '#4A16DA',
            contrastText: 'white',
        },
        },
    });

    const openCreatePage = (event) => {
        actions.createPageFlag(true)
        actions.showEditCreatePageFlag(true)
    }

    // Fetch Material table column data
    const fetchColumnData = async () => {
        const materialTableColumnDataRes = await materialTableColumnData1(columnDataUrl)
        actions.materialTableColumnData(materialTableColumnDataRes)
    }
    useEffect(()=>{
        fetchColumnData()
    }, [])

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
                        } Table</b>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12} className="text-end mb-3">
                        <Button variant="primary" onClick={openCreatePage}>Create {common_function.titleCase(window.location.pathname.split("/")[window.location.pathname.split("/").length-1])}</Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    actions={actionData}
                    title={common_function.titleCase(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]) + ' Data'}
                    columns={materialTableColumnData && materialTableColumnData[0] && materialTableColumnData[0].columnData ? materialTableColumnData[0].columnData : []}
                    options={{ debounceInterval: 700, padding: "dense", filtering: true, pageSize: 5, exportButton: true }}
                    data= {async (query) => {
                    try {
                        console.log('MaterialTableConfig.js : MaterialTableConfig: query : ', query)
                        // fetch Table data
                        const tableData = await axiosHandler.request({ method: 'POST', requestUrl: baseUrl, data: query})
                        console.log('MaterialTableConfig.js : MaterialTableConfig: tableData : ', tableData)
                        if (tableData && tableData.data) {
                        return { data: tableData.data.merchantList, page: query.page, totalCount: parseInt(tableData.data.totalCount) }
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
    )
}


const MaterialEditCreatePage = (props) => {
    const { handleSubmit, inputFields } = props.data;
    const [ errorSuccessMsg, setErrorSuccessMsg ] = useState({ flag: false, message: '', type: '' })

    // Redux
    const dispatch = useDispatch()
    const actions = bindActionCreators(actionCreators, dispatch)
    const showTableData = () => {
        actions.showEditCreatePageFlag(false)
        setErrorSuccessMsg({ flag: false, message: '', type: '' })
    }

    useEffect(() => {
        console.log('check after render =======');
        setErrorSuccessMsg({ flag: false, message: '', type: '' });
    }, [])

    const [hiddenAlerts, setHiddenAlerts] = React.useState([]);

    const onClose = (alertId) => {
        const hiddenAlertsUpdated = [...hiddenAlerts, alertId];
        setHiddenAlerts(hiddenAlertsUpdated);
    };

    const shouldShowAlert = (alertId) => (
        hiddenAlerts.indexOf(alertId) === -1
    );
    return (
        <Card>
        <Card.Header as="h5">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}  className="mb-3">
              {/* <b>EDIT {((window.location.pathname.split("/")[1]).replace("_", " ")).toUpperCase()}</b> */}
              <b>{
                window.location.pathname.split("/").map((lists, key) => {
                  if (lists) {
                    return `${common_function.titleCase(lists.replace("_", " "))} ${key >= (window.location.pathname.split("/").length)-1 ? '' : ' > '}`
                  }
                })
              } Edit</b>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12} className="text-end mb-3">
              <Button variant="link" onClick={showTableData} >{'<< '}Go Back</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
        {
            errorSuccessMsg.flag ?
            <React.Fragment>
                <Alert
                    variant={errorSuccessMsg.type}
                    show={shouldShowAlert("danger")}
                    onClose={() => onClose("danger")}>

                    <div className="d-flex justify-content-between">
                    <div>
                        <strong>{errorSuccessMsg.message}</strong>
                    </div>
                    <Button variant="close" size="xs" onClick={() => onClose("danger")} />
                    </div>
                </Alert>
            </React.Fragment> :
            <></>
        }
        <Row>
        <Form className="mb-12 editFormData" onSubmit={(event) => handleSubmit(event, setErrorSuccessMsg)}><hr />
            { inputFields }
            <Row>
            <Col lg={3} md={3} sm={12} xs={12}  className="mb-3">
                <Button variant="success" type="submit" className="m-1">Success</Button>
            </Col>
            </Row>
        </Form>
        </Row>
        </Card.Body>
        </Card>
    )
}

export {
    MaterialTableStructure,
    MaterialEditCreatePage
}