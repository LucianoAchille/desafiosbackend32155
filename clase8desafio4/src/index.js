const Server = require('../src/services/server')
const port = 8080;

//console.log("hola")
Server.listen(port, ()=>{
    console.log('Server escuchando en puerto', port)
})
