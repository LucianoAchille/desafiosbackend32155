//const express = require('express');
const { Router } = require("express");
const productRouter = require('./productos');
//const formularioRouter = require('./formulario');

const mainRouter = Router();

//const router = Router();

// router.get('/',(req,res)=>{ 
//     res.json({
//         msg: "ok router"
//     })
// })

mainRouter.use('/productos',productRouter);
//router.use('/formulario',formularioRouter);
module.exports = mainRouter;