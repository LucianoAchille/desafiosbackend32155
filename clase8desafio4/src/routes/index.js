const express = require('express');

const productosRouter = require('./productos');
const formularioRouter = require('./formulario');

const router = express.Router();

//const router = Router();

// router.get('/',(req,res)=>{ 
//     res.json({
//         msg: "ok router"
//     })
// })

router.use('/productos',productosRouter);
router.use('/formulario',formularioRouter);
module.exports = router;