// axios
import axiosHandler from '../../utils/axiosHandler'
import util from '../../utils/util'
import common_function from '../../utils/common_function'
import loggers from "../../utils/loggers";

const onSubmitValidation = async (formData, actions) => {
  loggers.logs('loginController.js', 'onSubmitValidation', 'request', JSON.stringify({formData, actions}))
  const requestData = { 
    method: 'post',
    requestUrl: 'http://localhost:8082/login',
    data: formData
  }
  const loginResponse = await axiosHandler.request(requestData)
  loggers.logs('loginController.js', 'onSubmitValidation', 'loginResponse', JSON.stringify(loginResponse))
  if (loginResponse && loginResponse.data && Object.keys(loginResponse.data).length > 0 && loginResponse.data.status === 200) {
    // localStorage.setItem('userDetails', JSON.stringify({ id, email }))
    return { status: 200, message: 'Success', respcode: 1000, token: loginResponse.data.data.token }
  }
  return { status: 400, message: { email: 'Invalid Email', password: 'Invalid Password' }, respcode: 1001, token: 'Invalid' }
}

const fetchAuthToken = async () => {
  try {
      const retriveContacts = JSON.parse(localStorage.getItem('userDetails'))
      const requestForToken = { 
          method: 'get',
          requestUrl: `http://localhost:3004/users/${retriveContacts.id}`,
      }
      const requestForTokenResp = await axiosHandler.request(requestForToken)
      if (requestForTokenResp && requestForTokenResp.data) {
          return requestForTokenResp.data.token
      }
      return ''
  } catch (error) {
      return ''
  }
}

const formSubmitValidation = async (formData, actions) => {
  try {
    loggers.logs('loginController.js', 'onSubmitValidation', 'request', JSON.stringify({formData, actions}))
    const requestData = { 
      method: 'post',
      requestUrl: 'http://localhost:8082/login',
      data: formData
    }
    const loginResponse = await axiosHandler.requestWithoutToken(requestData)
    loggers.logs('loginController.js', 'onSubmitValidation', 'loginResponse', JSON.stringify(loginResponse))
    if (loginResponse && loginResponse.data && Object.keys(loginResponse.data).length > 0 && loginResponse.data.status === 200) {
      localStorage.setItem(util.localStorageUserDetails, JSON.stringify({ email: formData.email, token: loginResponse.data.data.token }))
      await common_function.setCookies(util.localStorageUserDetails, JSON.stringify({ email: formData.email, token: loginResponse.data.data.token }))
      // console.log('cookies =====', cookies.get(util.localStorageUserDetails))
      // const retriveContacts = JSON.parse(localStorage.getItem(util.localStorageUserDetails))
      return { status: 200, message: loginResponse.data.message , respcode: 1000, token: loginResponse.data.data.token }
    }
    return { status: 400, message: loginResponse && loginResponse.data && loginResponse.data.message ? loginResponse.data.message : 'Fail', respcode: 1001 }
  } catch (error) {
    return { status: 400, message: 'Fail', respcode: 1001 }
  }
  
}


export default {
    onSubmitValidation,
    fetchAuthToken,
    formSubmitValidation
}