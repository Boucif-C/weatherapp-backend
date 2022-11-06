function checkBody(req,reqSchema){
    let result = false;    
for (let index = 0; index < reqSchema.length; index++) {
    const element = reqSchema[index];
    result=true;
    if(!req[element]){
        result=false;
        return result; 
    }
}
    return result;
}

module.exports={
    checkBody,
}