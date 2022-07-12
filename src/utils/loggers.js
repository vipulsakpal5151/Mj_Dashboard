const logs = (pageName = '', functionName = '', fieldName = '', value = '') => {
    console.log(`Page: ${pageName} || Action: ${functionName} || Filed: ${fieldName} || Value: ${value}`)
}

export default { 
    logs 
}