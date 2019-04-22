const app = require('./src/index.js')
const httpServer = require('http').Server(app)

httpServer.listen(app.get('port'), () => {
    console.log('Listening on port: ', app.get('port'))
})


