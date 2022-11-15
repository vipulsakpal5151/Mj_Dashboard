export const depositeMoney = (amount) => {
    return (dispatch) => {
       dispatch({
            type: 'deposit',
            payload: amount
       })
    }
}

export const withdrawMoney = (amount) => {
    return (dispatch) => {
        dispatch({
             type: 'withdraw',
             payload: amount
        })
     }
}

export const authTokenState = (token) => {
     return (dispatch) => {
         dispatch({
              type: 'token',
              payload: token
         })
      }
 }

export const userPermissions = (userPermissions) => {
     return (dispatch) => {
         dispatch({
              type: 'userPermissions',
              payload: userPermissions
         })
      }
 }

 export const showEditCreatePageFlag = (showEditCreatePageFlag) => {
     return (dispatch) => {
         dispatch({
              type: 'showEditCreatePageFlag',
              payload: showEditCreatePageFlag
         })
      }
 }

 export const rowDataForEditCreatePage = (rowDataForEditCreatePage) => {
     return (dispatch) => {
         dispatch({
              type: 'rowDataForEditCreatePage',
              payload: rowDataForEditCreatePage
         })
      }
 }

 export const materialTableColumnData = (materialTableColumnData) => {
     return (dispatch) => {
         dispatch({
              type: 'materialTableColumnData',
              payload: materialTableColumnData
         })
      }
 }

 export const createPageFlag = (createPageFlag) => {
     return (dispatch) => {
         dispatch({
              type: 'createPageFlag',
              payload: createPageFlag
         })
      }
 }

 export const errorSuccessMsg = (errorSuccessMsg) => {
     return (dispatch) => {
         dispatch({
              type: 'errorSuccessMsg',
              payload: errorSuccessMsg
         })
      }
 }

 export const dataBeforeEditTableShow = (dataBeforeEditTableShow) => {
     return (dispatch) => {
         dispatch({
              type: 'dataBeforeEditTableShow',
              payload: dataBeforeEditTableShow
         })
      }
 }