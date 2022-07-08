// import axios from "../../../config/axios"
// const initialValue = JSON.parse(localStorage.getItem('userDetails')) || null
const initialValue = ''
console.log('initialValue', initialValue)
const reducer = async (state = '', action) => {
    // if (!state) {
    //     const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    //     console.log('reducer : userDetails', userDetails)
    //     // if (userDetails) {
    //     //     try {
    //     //         const responseData = await axios.request({ method: 'GET', requestUrl: `http://localhost:3004/users/${userDetails.id}` })
    //     //         console.log('reducer try : responseData', responseData)
    //     //         state = ( responseData && responseData.data && responseData.data.token ) ? responseData.data.token : ''
    //     //     } catch (error) {
    //     //         console.log('reducer catch : error', error)
    //     //         state = ''
    //     //     }
    //     // }
    // }
    if (action.type === 'token') return action.payload
    else return state
}

export default reducer
