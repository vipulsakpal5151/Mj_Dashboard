const logs = (pageName = '', functionName = '', fieldName = '', value = '') => {
    console.log(`Page: ${pageName} || Action: ${functionName} || Field Name: ${fieldName} || Value: ${value}`)
}

export default { 
    logs 
}