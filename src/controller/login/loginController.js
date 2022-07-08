// axios
import axiosHandler from '../../utils/axiosHandler'
import authUser from '../../utils/authUser'

const onSubmitValidation = async (formData, actions) => {
  
    console.log({ actions, formData })
    const requestData = { 
      method: 'post',
      requestUrl: 'http://localhost:8000/auth/login',
      data: {
        email: formData.email,
        password: formData.password
      }
    }
    const loginResponse = await axiosHandler.request(requestData)
    // const loginResponse = await axios.instance.get(`/login?email=${formData.email}&password=${formData.password}`)
    // const loginResponse = await axios.get('/posts')
    console.log('loginResponse =============', loginResponse)
    if (loginResponse && loginResponse.data && Object.keys(loginResponse.data).length > 0) {
      const requestDataToUpdateToken = { 
        method: 'PUT',
        requestUrl: `http://localhost:3004/users/${loginResponse.data.id}`,
        data: {
          email: formData.email,
          password: formData.password,
          token: loginResponse.data.access_token
        }
      }
      const requestDataToUpdateTokenResp = await axiosHandler.request(requestDataToUpdateToken)
      console.log('requestDataToUpdateTokenResp =============', requestDataToUpdateTokenResp)
      if (requestDataToUpdateTokenResp && requestDataToUpdateTokenResp.data && Object.keys(requestDataToUpdateTokenResp.data).length > 0) {
        const { id, email } = requestDataToUpdateTokenResp.data
        localStorage.setItem('userDetails', JSON.stringify({ id, email }))
        return { status: 200, message: 'Success', respcode: 1000, token: loginResponse.data.access_token }
      }
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
  console.log('formSubmitValidation : request : ', { actions, formData })
  try {
    const requestData = { 
      method: 'post',
      requestUrl: 'login',
      data: {
        email: formData.email,
        password: formData.password
      }
    }
    console.log('formSubmitValidation: requestData: ', { requestData })
    const response = await axiosHandler.request(requestData)
    console.log('formSubmitValidation: response: ', { response })

    if (response && response.data) {
      const setUserDetails = await authUser.setUserDetails(response.data)
      console.log('formSubmitValidation : setUserDetails : ', { setUserDetails })
    } else {
      return { status: 400, message: { email: 'Invalid Email', password: 'Invalid Password' }, userData: {} }
    }
    return { status: 200, message: "Success", userData: (response && response.data) ? response.data : {} }
  } catch (error) {
    console.log('formSubmitValidation: error: ', { error })
    return { status: 400, message: { email: 'Invalid Email', password: 'Invalid Password' }, userData: {} }
  }
}


export default {
    onSubmitValidation,
    fetchAuthToken,
    formSubmitValidation
}