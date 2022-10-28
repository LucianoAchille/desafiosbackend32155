const express = require('express');
const mainRouter = require('../routes/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter); //todo lo q empiece con /api lo va a manejar mainRouter

app.get('/',(req,res)=>{ //endpoitn en ruta principal
    res.json({
        msg: "ok desde app"
    })
})

app.use((err, req, res, next) => { //middleware ataja los errores q vengan de las rutas
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server error';

    res.status(status).json({
        message,
        stack: err.stack
    })
});

module.exports = app;