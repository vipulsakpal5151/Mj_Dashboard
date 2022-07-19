const initialValue = {}

const userPermissionsReducer = (state = initialValue, action) => {
    if (action.type === 'userPermissions') return action.payload || {}
    else return state || {}
}

export default { 
    userPermissionsReducer 
}