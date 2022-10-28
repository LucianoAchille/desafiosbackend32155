const { Router } = require('express')
const { ProductsController } = require('../controllers/contenedor')

const router = Router();


router.get('/', async (req,res,next)=>{
    try{
        let respuesta = await ProductsController.getAll();
        res.json(respuesta);
    } catch(error){
        next(error);
    }
});

router.get('/:id', async (req,res,next)=>{
    try{
        const id = parseInt(req.params.id)
        let respuesta = await ProductsController.getById(id);
        res.json(respuesta);
    } catch(error){
        next(error);
    }
})

router.post('/', async (req, res, next)=>{
    try{
        const producto = req.body;
        let respuesta = await ProductsController.save(producto);
        res.json({
            msg: `Se agregó producto ${respuesta}`
        })
    }catch (error){
        next(error);
    }
})

router.put('/:id', async (req,res,next)=>{
    const id = parseInt(req.params.id);
    const body = req.body;
    try{
        let producto = await ProductsController.updateById(id, body)
        res.json(producto);
    }catch(err){
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        //console.log(req.params)
        const id = parseInt(req.params.id);
        //console.log(id)
        await ProductsController.deleteById(id);

        res.json({ 
            msg: `Producto ${id} eliminado` 
        })
    } catch (error) {
        next(error)
    }
});

module.exports = router