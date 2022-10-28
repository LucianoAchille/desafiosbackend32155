const fs = require ('fs');

const filePath = '../clase8desafio4/src/productos.json';
class Contenedor{
    constructor(arch){
    this.arch=arch;
    }
    
    async validateExistFile() {
		try {
			await fs.promises.stat(`${this.arch}`)
		} catch (err) {
			await fs.promises.writeFile(`${this.arch}`, JSON.stringify([]));
		}
	}
    
    async readFileFn() {
		await this.validateExistFile();
		const contenido = await fs.promises.readFile(`${this.arch}`, 'utf-8');
		return JSON.parse(contenido);
	}

    async writeProducts(productos) {
		await this.validateExistFile();
		const data = JSON.stringify(productos, null, 4)
		await fs.promises.writeFile(this.arch, data)
	}

    async save(object){
        const data = await this.readFileFn();
		let id = 1;
        if (data.length) {
			id = data[data.length - 1].id + 1;
		}
        const nuevoProducto = {
			title: object.title,
			price: object.price,
			id: id,
		};
        console.log(nuevoProducto);
		data.push(nuevoProducto);
        
        await this.writeProducts(data)
		console.log(`Producto agregado con id: ${nuevoProducto.id}`);
        return nuevoProducto.id;
        // try{
        //     console.log(`Id asignado: ${JSON.stringify(object)}`);
        //     await fs.writeFile(this.arch, JSON.stringify(cant, null,2));
        //     console.log('Agregado con exito');
        //     } catch (error){
        //         console.error('No se pudo agregar');
        //         console.error(error);
        //     }
    }
    
    async getById(id){
        
        const data = await this.readFileFn()
		const productoId = data.find((producto) => producto.id === id);

		if (!productoId) throw new Error("No existe ese producto");

		return productoId;
        // const objetos = await this.getAll();
        // if(id<0) return console.log("Id no valido")
        // if(objetos.length === 0){
        //     console.log('Array vacio');
        //     return false;
        // }
        // let objeto = objetos.find(el => el.id == id);
        // if (objeto) return objeto;
        // return null;
    }
    
    async getAll(){
        try {
            let objetos = this.readFileFn();
            return objetos;
        } catch (error) {
            console.error('Error de lectura getAll');
            }
    }
    
    async exists(id) {
		const data = await this.getAll()
		const indice = data.findIndex(aProduct => aProduct.id == id)
		// if(indice < 0){
		// 	return false;
		// } else {
		// 	return true;
		// }
		return indice >= 0; //lo mismo q el if
	}
   
    async updateById(id, datanueva) {
		const exist = await this.exists(id);
		if (!exist) throw new Error(`El Producto con id ${id} no existe`)

		const productos = await this.getAll();
		const productoId = productos.findIndex(producto => producto.id == id);

		const oldProduct = productos[productoId];

		const nuevoProducto = {
			id: oldProduct.id,
			title: datanueva.title,
			price: datanueva.price
		}

		productos.splice(productoId, 1, nuevoProducto)

		await this.writeProducts(productos)
		return nuevoProducto;

	}

    async deleteById(id){
        
        const data = await this.readFileFn();
        const productoId = data.findIndex((producto) => producto.id === id);
        console.log(data[productoId]);
        if (productoId<0) {
            throw new Error(`EL producto ${id} no existe`)
        }
        data.splice(productoId, 1);
        await this.writeProducts(data);
        // if(objetos.length===0){
        //     console.log('Array vacio');
        //     return false;
        // }
        // const objeto = objetos.find(el => el.id == id);
        // const nuevoObjetos = objetos.filter(el=> el != objeto);
        // console.log(nuevoObjetos);
        // try {
        //     console.log('Se eliminara: ${JSON.stringify(objeto)}');
        //     await fs.writeFile(this.arch, JSON.stringify(nuevoObjetos,null,2));
            
        // } catch (error) {
        //     console.error('Error de escritura.');
        //     console.error(error);
        // }
    }    

    async deleteAll(){
        
        await this.writeProducts([]);
        // try {
        //     console.log('Eliminando todos los objetos');
        //     await fs.writeFile(this.arch, "")
        //     console.log('Objetos eliminados');
        // } catch (error) {
        //     console.error('Error de escritura');
        //     console.error(error);
        // }
    }
}
//module.exports = Contenedor;
// const instanciaProductsApi = new Contenedor(filePath);
// module.exports = {ProductsController : instanciaProductsApi};
const instanciaProductsApi = new Contenedor(filePath)

module.exports = {
	ProductsController: instanciaProductsApi
} 
