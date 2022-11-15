const socketIo = require('socket.io');
const {saveFile, readFile, validateBody} = require('../controllers/files.js')
const moment = require('moment/moment');

let io;

const socketServer = (server)=>{
    io = socketIo(server);
    io.on('connection', (socket)=>{
        console.log('Nueva conexion establecido');

        socket.on('addProduct', async (product)=>{
            try {
                product.price = Number(product.price);
                validateBody(product);
                const dataJson = await readFile('productos');
                let id=1;
                if (dataJson.length){
                    id = dataJson[dataJson.length-1].id+1;
                }
                const newProduct = {
                    id: id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail
                };
                dataJson.push(newProduct);
                io.emit('addTable', dataJson[dataJson.length-1]);
                await saveFile(dataJson,'productos');

            } catch (error) {
                console.log(error);
            }
        })
        socket.on('newMessage', async(message)=>{
            try {
                const messageJson = await readFile('messages')
                const newMessage  = {
                    email: message.email,
                    msg: message.msg,
                    //time: moment().format('MMMM Do YYYY, h:mm:ss a');
                    time: moment().format('llll')
                }
                messageJson.push(newMessage)
    
                io.emit('renderMessage', messageJson[messageJson.length-1])
    
                await saveFile(messageJson,'messages')
            } catch (error) {
                console.log(error);
            }


        })
    })
return io;
}

module.exports = socketServer;