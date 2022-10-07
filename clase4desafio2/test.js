const Contenedor = require('./Contenedor')

async function main(){
    const product = new Contenedor('./productos.json')
    // Prueba metodo getAll()
    //console.log('Todos los productos');
        //let allProducts = await product.getAll()
    //console.log(allProducts)
    
    // // Prueba metodo getById()
    // let idToSearch = 4
    // console.log(`Producto con id ${idToSearch}`)
    // let productById = await product.getById(idToSearch)
    // console.log(productById)
    
    // Prueba metodo save()
    //let newProduct1 = {"Title": "Producto 4","id":4, "price": 444,} // Prueba con un producto que ya posee id
    //await product.save(newProduct1)
    //let newProduct2 = {"Title": "Producto 6","id":6, "price": 666,} // Prueba con un producto sin id
    //await product.save(newProduct2)
    
    // Prueba deleteById()
    // console.log('Prueba de eliminacion')
    //let productIdToDelete = 4;
    //await product.deleteById(productIdToDelete)
    // allProducts = await product.getAll() // Actualizo la variable allProducts para ver si se ha eliminado el elemento
    // console.log(allProducts)
    
    // Prueba deleteAll()
    // await products.deleteAll();
}
main();