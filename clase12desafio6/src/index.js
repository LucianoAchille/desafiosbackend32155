const server = require('./services/server');
const initWsServer = require('./services/socket');
const port = 8080;

//console.log("hola")

const init = async()=>{
    try {
        initWsServer(server)
        //console.log(server);
        server.listen(port, ()=>{
            console.log('Server escuchando en puerto', port)
        })
    } catch (error) {
        console.log(error)
    }
}

init();