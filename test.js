const _ = require('lodash')
const main = function (dateString,recursion) {
    let validateRet = validateNumber(dateString)
    if(validateRet.code !== 0) {
        return -1
    }
    let dataItems = _.toArray(dateString).map(_.toNumber);
    return  compulute(dataItems,recursion)
}

const validateNumber = function (dateString) {
    if(!_.isString(dateString)) {
        return {code:-1,msg:"dateString is not string"}
    }
    if(dateString.length == 0) {
        return {code:-1,msg:"waitting for input data"}
    }
    for(let i =0; i < dateString.length; i++) {
        let item = dateString[i]
        if(!_.isNumber(parseInt(item))) {
            return {code:-1,msg:"error parse number index:" +i +",dateString is " + dateString}
        }
    }
    return  {code:0,msg:"success"}
}

const compulute  = function (arrs, recursion) {
    if(!recursion) {
        let c = (arrs.reduce((a,b)=>a+b))
        return c % 8 == 0?8:(c % 8)
    }
    let mid_ret = arrs.reduce((a,b)=>a+b)
    let arr = _.toArray(mid_ret.toString()).map(_.toNumber);
    if(arr.length > 1) {
        return compulute(arr,true)
    }
    return arr[0] >= 9?arr[0] - 8 :arr[0]
}


for(let i =7009298 ; i < 99999999 ;i++) {
    let ret = main(i+"",true)
    let ret2 = main(i+"",false) 
    if(ret > 8 || ret <= 0) {
       
        console.log(i,ret)
        throw new Error()
    }
    if(ret2 > 8 || ret2 <= 0) {
        console.log(i,ret2)
        throw new Error()
    }
    console.log(i)

}















