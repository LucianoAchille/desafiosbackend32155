//console.log("hola");
class Usuario {
    constructor (nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros =  [];
        this.mascotas = mascotas || []
    }
    getFullName(){
        return `Nombre completo: ${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);

    }
    countMascotas(){
        let cont = 0;
        for(let i=0; i<this.mascotas.length;i++){
            cont++;
        }
        return `El usuario ${this.nombre} ${this.apellido} tiene ${cont} mascotas`;
    }
    addBook(nombre,autor){
        let libro = {};
        libro.nombreLibro=nombre;
        libro.autor=autor;
        //console.log(libro);
        this.libros.push(libro);
        //console.log(this.libros);
    }
    getBookNames(){
        let array = [];
        //array = this.libros.map(array.push(this.libros.nombreLibro));
        for(let i=0;i<usuario.libros.length;i++){
            console.log(usuario.libros[i]);
            array.push(usuario.libros[i])
        }
        return array;
    }    

}
const usuario = new Usuario("Luciano","Achille",{nombreLibro:"libro1",autor:"autor1"},["perro","gato"]);
console.log(usuario.getFullName());
usuario.addMascota("pez");
console.log(usuario.countMascotas());
usuario.addBook("Libro2","Autor2");
usuario.addBook("Libro3","Autor3");
console.log("Lista de Libros: ", usuario.getBookNames());






