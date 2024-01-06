const hostname = (server, hostname, req)=>{
    if (server == 'PROD') {
        return req.hostname
    } else {
        return hostname
    }
}

module.exports = {hostname}