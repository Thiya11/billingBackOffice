const fieldMap = {
    first_name:'firstName',
    last_name:'lastName',
    id:'userId',
    token:'token',
    role_id:'roleId',
    email:'email',
    status:'status',
    role_id:'roleId',
    role_name:'roleName'
}

const singleSwagObj = (reqObj,mappinKeys = fieldMap) => {
    return Object.keys(reqObj).reduce((acc,key)=> {
        const updatedKey = mappinKeys[key];
        updatedKey ? acc[updatedKey]  = reqObj[key] : '';
        return acc; 
    },{})
}

const multiSwagObj = (reqObj) => {
    let tempArr = [];
    for (let item of reqObj) {
        tempArr.push(singleSwagObj(item))
    }
    return tempArr;
}

module.exports = {
    singleSwagObj,
    multiSwagObj
}