if(process.env.NODE_ENV === 'production'){  // local
    module.exports = require('./prod')
}
else{
    module.exports = require('./dev') // deploy(배포)후
}