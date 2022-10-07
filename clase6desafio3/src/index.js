const express = require('express');
const app = express();
const PORT = 8080;
const Contenedor = require('./Contenedor')

const server = app.listen(PORT, ()=>{
    console.log("Servidor escuchando en el púerto", PORT)
});
server.on('error',(err)=>{
    console.log(err);
});

const product = new Contenedor ('./src/productos.json');

app.get('/',(req,res)=>{
    res.json({
        mensaje: "Bienvenido a Servidor Express de Luciano Achille"
    });
})

app.get('/productos',async (req,res)=>{
    const productos = await product.getAll();
    res.json(productos);
})

app.get('/productoRandom', async (req,res)=>{
    const productos = await product.getAll();
    let cantidad = productos.length;
    let min = 0;
    let random = Math.floor(Math.random() * (cantidad - min) + min)
    res.json({
        mensaje: productos[random]
    });
})
