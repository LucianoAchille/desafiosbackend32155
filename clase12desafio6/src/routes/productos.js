const { Router } = require('express')
//const { ProductsController } = require('../controllers/contenedor')
//const fs= require('fs');
//const path = require('path');
const createError = require('http-errors')

const router = Router();
const {saveFile, readFile, validateBody} = require('../controllers/files')




router.get('/', async (req,res,next)=>{
    try{
        let dataJson = await readFile('productos');
        //console.log(dataJson);
        res.render('tablas', {dataJson});
    } catch(error){
        next(error);
    }
});

router.get('/:id', async (req,res,next)=>{
    try{
        const id = parseInt(req.params.id)
        let dataJson = await readFile('productos');
        let index = dataJson.findIndex((idProduct)=> idProduct == id);
        if (index<0) {
            return res.status(404).json({
              msg: `El producto con id ${id} no existe`,
            });
          }
        res.json({
            data: dataJson[index],
        });
    } catch(error){
        next(error);
    }
})


router.post('/', async (req, res, next)=>{
    try{
        const body = req.body;
        console.log(body);
        body.price=Number(body.price);
        validateBody(body);
        let dataJson = await readFile('productos');
        let id=1;
        if (dataJson.length){
            id = dataJson[dataJson.length-1].id+1;
        }
        const newProduct = {
            id: id,
            title: body.title,
            price: body.price,
            thumbnail: body.thumbnail
        };
        dataJson.push(newProduct);
        await saveFile(dataJson,'productos');
        // res.json({
        //     msg: `Se agregó producto ${id}`
        // })
        res.redirect('/');
        
    }catch (err){
        next(err);
    }
})

router.put('/:id', async (req,res,next)=>{
    try{
        const body = req.body;
        validateBody(body);
        const id = parseInt(req.params.id);
        let dataJson = await readFile('productos');
        let index = dataJson.findIndex((idProduct)=> idProduct == id);
        if (index<0) {
            return res.status(404).json({
            msg: `El producto con id ${id} no existe`,
            });
        }
        dataJson[index]={
            id: id,
            title: body.title,
            price: body.price,
            thumbnail: body.thumbnail
        };
        await saveFile(dataJson,'productos');
        res.json({
            msg: `Se modifico producto ${id} con ${dataJson[index]}`
        });
    }catch(err){
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        let dataJson = await readFile('productos');
        let index = dataJson.findIndex((idProduct)=> idProduct == id);
        if (index<0) {
            return res.status(404).json({
            msg: `El producto con id ${id} no existe`,
            });
        }
        dataJson.splice(index,1);
        await saveFile(dataJson,'productos');
        res.json({ 
            msg: `Producto ${id} eliminado correctamente` 
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router