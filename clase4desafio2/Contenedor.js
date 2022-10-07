const {promises: fs} = require ('fs');

class Contenedor{
    constructor(arch){
    this.arch=arch;
    }
    async save(object){

        const cant = await this.getAll();
        object.id = cant[cant.length-1].id + 1;
        cant.push(object);
        try{
            console.log(`Id asignado: ${JSON.stringify(object)}`);
            await fs.writeFile(this.arch, JSON.stringify(cant, null,2));
            console.log('Agregado con exito');
            } catch (error){
                console.error('No se pudo agregar');
                console.error(error);
            }
    }
    
    async getById(id){
        const objetos = await this.getAll();
        if(id<0) return console.log("Id no valido")
        if(objetos.length === 0){
            console.log('Array vacio');
            return false;
        }
        let objeto = objetos.find(el => el.id == id);
        if (objeto) return objeto;
        return null;
    }
    
    async getAll(){
        try {
            let objetos = await fs.readFile(this.arch, 'utf-8');
            return JSON.parse(objetos);
        } catch (error) {
            console.error('Error de lecturaaa');
            console.error(error);
            return [];
        }
    }
    
    async deleteById(id){
        const objetos = await this.getAll();
        if(objetos.length===0){
            console.log('Array vacio');
            return false;
        }
        const objeto = objetos.find(el => el.id == id);
        const nuevoObjetos = objetos.filter(el=> el != objeto);
        console.log(nuevoObjetos);
        try {
            console.log('Se eliminara: ${JSON.stringify(objeto)}');
            await fs.writeFile(this.arch, JSON.stringify(nuevoObjetos,null,2));
            
        } catch (error) {
            console.error('Error de escritura.');
            console.error(error);
        }
    }    
    async deleteAll(){
        try {
            console.log('Eliminando todos los objetos');
            await fs.writeFile(this.arch, "")
            console.log('Objetos eliminados');
        } catch (error) {
            console.error('Error de escritura');
            console.error(error);
        }
    }
}
module.exports = Contenedor;