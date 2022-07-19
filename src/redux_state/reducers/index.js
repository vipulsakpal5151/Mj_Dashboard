import amountReducer from "./amountReducer"
import commonDataReducer from "./commonDataReducer"
import authTokenStateReducer from "./login/authTokenStateReducer"
import materialTableReducer from "./material_table/materialTableReducer"
import { combineReducers } from "redux"

const reducers = combineReducers({
    amount: amountReducer,
    token: authTokenStateReducer,
    userPermissions: commonDataReducer.userPermissionsReducer,
    showEditCreatePageFlag: materialTableReducer.showEditCreatePageFlagReducer,
    rowDataForEditCreatePage: materialTableReducer.rowDataForEditCreatePageReducer,
    materialTableColumnData: materialTableReducer.materialTableColumnDataReduer,
    createPageFlag: materialTableReducer.createPageFlagReducer,
    errorSuccessMsg: materialTableReducer.errorSuccessMsgReducer,
})

export default reducers