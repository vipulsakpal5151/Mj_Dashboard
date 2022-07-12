const initialValue = {}

const tabsAndOperationDataReducer = (state = initialValue, action) => {
    if (action.type === 'tabsAndOperationData') return action.payload || {}
    else return state || {}
}

export default { 
    tabsAndOperationDataReducer 
}