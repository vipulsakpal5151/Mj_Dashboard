import axiosConnection from "./axiosConnection"
import util from '../utils/util'
import common_function from '../utils/common_function'

const request = async ({ method, requestUrl = null, withBaseUrl = null, filterData = {}, data = {}, headers = {'content-type': 'application/json'} }) => {
    console.log('axiosHandler : request: fileds : ', { method, requestUrl, withBaseUrl, filterData, data, headers })
    let token = common_function.getCookies(util.localStorageUserDetails) || {}
    token = token && token.token ? token.token : '' 
    headers.authorazation = `Bearer ${token}`
    let response = {}
    let { instance } = axiosConnection()
    let url = requestUrl
    if (!requestUrl) {
        instance = require('axios')
        url = withBaseUrl
    }
    data = await requestDataHandler(data)
    console.log('request headers', headers)
    try {
        switch (method.toLowerCase()) {
            case 'get':
                let filterUrl = ''
                await Object.keys(filterData).forEach(function(key) {
                    console.log()
                    filterUrl = `${filterUrl}${key}=${filterData[key]}${(Object.keys(filterData).pop() !== key ? '&' : '')}`
                })
                console.log('filterUrl', filterUrl)
                response = await instance.get(url, data, { headers })
                console.log('get :', { response })
                break
            case 'post':
                response = await instance.post(url, data, { headers })
                console.log('post :', { response })
            break
            case 'put':
                response = await instance.put(url, data, { headers })
                console.log('put :', { response })
            break
            default:
          }
          return await responseHandler(response)
    } catch (error) {
        console.log({ error })
        return { ...response, error }
    }
}

const requestWithoutToken = async ({ method, requestUrl = null, withBaseUrl = null, filterData = {}, data = {}, headers = {'content-type': 'application/json'} }) => {
    console.log('axiosHandler : request: fileds : ', { method, requestUrl, withBaseUrl, filterData, data, headers })
    let response = {}
    let { instance } = axiosConnection()
    let url = requestUrl
    if (!requestUrl) {
        instance = require('axios')
        url = withBaseUrl
    }
    data = await requestDataHandler(data)

    try {
        switch (method.toLowerCase()) {
            case 'get':
                let filterUrl = ''
                await Object.keys(filterData).forEach(function(key) {
                    console.log()
                    filterUrl = `${filterUrl}${key}=${filterData[key]}${(Object.keys(filterData).pop() !== key ? '&' : '')}`
                })
                console.log('filterUrl', filterUrl)
                response = await instance.get(url, data, { headers })
                console.log('get :', { response })
                break
            case 'post':
                response = await instance.post(url, data, { headers })
                console.log('post :', { response })
            break
            case 'put':
                response = await instance.put(url, data, { headers })
                console.log('put :', { response })
            break
            default:
          }
          return await responseHandler(response)
    } catch (error) {
        console.log({ error })
        return { ...response, error }
    }
}

const requestOnlyData = async ({ method, requestUrl = null, withBaseUrl = null, filterData = {}, data = {}, headers = {'content-type': 'application/json'} }) => {
    console.log('axiosHandler : request: fileds : ', { method, requestUrl, withBaseUrl, filterData, data, headers })
    let token = common_function.getCookies(util.localStorageUserDetails) || {}
    token = token && token.token ? token.token : '' 
    headers.authorazation = `Bearer ${token}`
    let response = {}
    let { instance } = axiosConnection()
    let url = requestUrl
    if (!requestUrl) {
        instance = require('axios')
        url = withBaseUrl
    }
    data = await requestDataHandler(data)
    console.log('request headers', headers)
    try {
        switch (method.toLowerCase()) {
            case 'get':
                let filterUrl = ''
                await Object.keys(filterData).forEach(function(key) {
                    console.log()
                    filterUrl = `${filterUrl}${key}=${filterData[key]}${(Object.keys(filterData).pop() !== key ? '&' : '')}`
                })
                console.log('filterUrl', filterUrl)
                response = await instance.get(url, data, { headers })
                console.log('get :', { response })
                break
            case 'post':
                response = await instance.post(url, data, { headers })
                console.log('post :', { response })
            break
            case 'put':
                response = await instance.put(url, data, { headers })
                console.log('put :', { response })
            break
            default:
          }

          const responseHandlerResp = await responseHandler(response)
          return responseHandlerResp && responseHandlerResp.data ? responseHandlerResp.data : { status: 400, message: 'Fail', respcode: 1001 }
    } catch (error) {
        console.log({ error })
        return { ...response, error }
    }
}

const responseHandler = async (response) => {
    if (response && response.data && response.data.respcode === 2000) {
        common_function.removeCookies(util.localStorageUserDetails)
    }
    return response
}

const requestDataHandler = (data) => {
    return data
}


export default {
    request,
    requestWithoutToken,
    requestOnlyData
}