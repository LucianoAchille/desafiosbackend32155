const express = require('express');
const http = require('http');
const path = require('path');
const mainRouter = require('../routes/index');
const { readFile } = require('../controllers/files')

const app = express();
const server = http.Server(app);


app.use(express.json());
app.use(express.urlencoded({extended: true}));



const publicFolderPath = path.resolve(__dirname,'../../public');
const viewsFolderPath = path.resolve(__dirname,'../../views');

app.use(express.static(publicFolderPath));

app.use('/api', mainRouter); //todo lo q empiece con /api lo va a manejar mainRouter

app.set('view engine', 'pug');
app.set('views', viewsFolderPath);

app.get('/',async (req, res, next) =>{
    try{
        const dataJson = await readFile('productos')
        const messageJson = await readFile('messages')
        res.render('formulario', {dataJson,messageJson})
    }catch (err){
        next(err)
    }
})


app.use((err, req, res, next) => { //middleware ataja los errores q vengan de las rutas
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server error';

    res.status(status).json({
        message
        //stack: err.stack
    })
});

module.exports = server;