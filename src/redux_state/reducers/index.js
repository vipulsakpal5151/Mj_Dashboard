import amountReducer from "./amountReducer"
import authTokenStateReducer from "./login/authTokenStateReducer"
import { combineReducers } from "redux"

const reducers = combineReducers({
    amount: amountReducer,
    token: authTokenStateReducer
})

export default reducers