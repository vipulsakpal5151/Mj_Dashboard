// If this flag false show material Table else show editCraete Page
const showEditCreatePageFlagReducer = (state = false, action) => {
    if (action.type === 'showEditCreatePageFlag') return action.payload
    else return state
}

const dataBeforeEditTableShowReducer = (state = {}, action) => {
    if (action.type === 'dataBeforeEditTableShow') return action.payload
    else return state
}

const rowDataForEditCreatePageReducer = (state = {}, action) => {
    if (action.type === 'rowDataForEditCreatePage') return action.payload
    else return state
}

const materialTableColumnDataReduer = (state = [], action) => {
    if (action.type === 'materialTableColumnData') return action.payload
    else return state
}

const createPageFlagReducer = (state = false, action) => {
    if (action.type === 'createPageFlag') return action.payload
    else return state
}

const errorSuccessMsgReducer = (state = { flag: false, message: '', type: '' }, action) => {
    if (action.type === 'errorSuccessMsg') return action.payload
    else return state
}

export default { 
    showEditCreatePageFlagReducer,
    rowDataForEditCreatePageReducer,
    materialTableColumnDataReduer,
    createPageFlagReducer,
    errorSuccessMsgReducer,
    dataBeforeEditTableShowReducer
}