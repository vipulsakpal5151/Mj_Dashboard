import amountReducer from "./amountReducer"
import commonDataReducer from "./commonDataReducer"
import authTokenStateReducer from "./login/authTokenStateReducer"
import { combineReducers } from "redux"

const reducers = combineReducers({
    amount: amountReducer,
    token: authTokenStateReducer,
    tabsAndOperationData: commonDataReducer.tabsAndOperationDataReducer
})

export default reducers