const imagepath = (para)=>{
    if (para == 'PROD') {
        return '../images/static-images'
    } else {
        return 'images'
    }
}

module.exports = {imagepath}