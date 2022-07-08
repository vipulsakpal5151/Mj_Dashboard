// import { bindActionCreators } from "redux"
// import actionCreators from "../redux_state/index"
// import { useDispatch, useSelector } from "react-redux"
import util from "./util"
// import axiosHandler from "./axiosHandler"

const setUserDetails = (fields) => {
    try {
        console.log('setUserDetails : request : ', fields)
        const { id, email, access_token } = fields
        // const dispatch = useDispatch()
        // const reduxBinding = bindActionCreators(actionCreators, dispatch)
        // reduxBinding.authTokenState(token)
        localStorage.setItem(util.localStorageUserDetails, JSON.stringify({ id, email, access_token }))
        return { status: 200, message: 'Success' }
    } catch (error) {
        console.log('setUserDetails : error : ', error)
        return { status: 400, message: 'Fail' }
    }
}

const getUserDetails = async () => {
    try {
        // let token = ''
        const getUserDetailsLocalStore = JSON.parse(localStorage.getItem(util.localStorageUserDetails))
        console.log('getUserDetails : getUserDetailsLocalStore : ', getUserDetailsLocalStore)
        // token = useSelector((state) => state.token)
        // console.log('getUserDetails : token : ', token)
        // if (!token && getUserDetailsLocalStore) {
        //     const requestForToken = { 
        //         method: 'get',
        //         withBaseUrl: `http://localhost:3004/users/${getUserDetailsLocalStore.id}`,
        //     }
        //     const responseForToken = await axiosHandler.request(requestForToken)
        //     console.log('getUserDetails : responseForToken : ', responseForToken)
        //     if (responseForToken && requestForToken.data) token = requestForToken.data.token
        // }
        if (!getUserDetailsLocalStore) return { status: 400, message: 'Fails' }
        return { status: 200, message: 'Suceess', userDeatils: getUserDetailsLocalStore }
    } catch (error) {
        console.log('getUserDetails : error : ', error)
        return { status: 400, message: 'Fail' }
    }
}

export default {
    setUserDetails,
    getUserDetails
}