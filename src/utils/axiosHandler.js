import axiosConnection from "./axiosConnection"

const request = async ({ method, requestUrl = null, withBaseUrl = null, filterData = {}, data = {}, headers = {'content-type': 'application/json'} }) => {
    console.log('axiosHandler : request: fileds : ', { method, requestUrl, withBaseUrl, filterData, data, headers })
    let response = {}
    let { instance } = axiosConnection()
    let url = requestUrl
    if (!requestUrl) {
        instance = require('axios')
        url = withBaseUrl
    }
    try {
        switch (method.toLowerCase()) {
            case 'get':
                let filterUrl = ''
                await Object.keys(filterData).forEach(function(key) {
                    console.log()
                    filterUrl = `${filterUrl}${key}=${filterData[key]}${(Object.keys(filterData).pop() !== key ? '&' : '')}`
                })
                console.log('filterUrl', filterUrl)
                response = await instance.get(url, data, headers)
                console.log('get :', { response })
                break
            case 'post':
                response = await instance.post(url, data, headers)
                console.log('post :', { response })
            break
            case 'put':
                response = await instance.put(url, data, headers)
                console.log('put :', { response })
            break
            default:
          }
          return response
    } catch (error) {
        console.log({ error })
        return { ...response, error }
    }
}

export default {
    request
}