const fs= require("fs")

class ProductManager{

    constructor(fileName){
        this.path=fileName;
        if(fs.existsSync(fileName)){
            try {
                let products = fs.readFileSync(fileName, "utf-8")
                this.products = JSON.parse(products)
            } catch(error){
                this.products = [];
            }
        }else{
            this.products = [];
        }
    }


    async saveFile(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
            return true
        }catch(error){
            console.log(error);
            return false
        }
    }



    getProducts(){
        return this.products;
    }

    async addProduct(product){
        if(this.products.length=== 0){
            product.id=1
        }else{
            product.id= this.products.length + 1
        }


        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error("Todos los campos son obligatorios")
            return 
        }

        const codeExist= this.products.find(p => p.code === product.code)
        if(codeExist){
            console.log("El codigo ya existe");
        }

        this.products.push(product);
        const respuesta = await this.saveFile(this.products)

        if(respuesta){
            console.log("Producto cargado");
        }else{
            console.log("Hubo un error al cargar el producto");
        }
    }


    getProductById(id){
            const product = this.products.find(product => product.id === id);
        
            if (!product) {
                console.error("Producto no encontrado");
                return;
            } else {
                console.log(product);
            }
    }

    async updateProduct(id) {
        try {
            const index = this.products.findIndex(product => product.id === id);
    
            if (index === -1) {
                console.log("Producto no encontrado");
            } else {
                this.products[index].title = "Nuevo Producto";
                this.products[index].description = "Nueva descripción";
                this.products[index].price = 25;
    
                console.log("Producto actualizado:", this.products);
    
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try{
            const index= this.products.findIndex(product => product.id === id)
            if(index === -1){
              console.log("No encontrado" );
            }else{
                this.products.splice(index, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
            }
        }catch(error){
            console.log(error);
        }
    }
}



class Product{

    constructor(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ){
        this.title=title,
        this.description=description,
        this.price=price,
        this.thumbnail= thumbnail,
        this.code=code,
        this.stock=stock
    }
    
}


// pruebas

const pruebaDeProductos = new ProductManager("./Productos.json")

// agregando producto 1:
/* - title: “producto prueba”
- description:”Este es un producto prueba”
- price:200,
- thumbnail:”Sin imagen”
- code:”abc123”,
- stock:25
*/

pruebaDeProductos.addProduct(new Product("Producto 1", "Este es un producto prueba", 200, "sin imagen", "ABC123", 25))

pruebaDeProductos.addProduct(new Product("Producto 2", "Este es un producto prueba", 20, "sin imagen", "1", 25))

pruebaDeProductos.addProduct(new Product("Producto 3", "Este es un producto prueba", 10, "sin imagen", "5", 25))

// mostrar el producto agregado
console.log(pruebaDeProductos.getProducts());


// ver si arroja error o si encuentra el producto getProductById

pruebaDeProductos.getProductById(3);

pruebaDeProductos.saveFile()

pruebaDeProductos.updateProduct(1)

pruebaDeProductos.deleteProduct(2)