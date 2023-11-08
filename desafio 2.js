const fs= require("fs")

class ProductManager{

    constructor(fileName){
        this.fileName=fileName
        this.productId = 1
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


    async saveFile(data){
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, "\t"))
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
        product.id = this.productId++
        
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error("Todos los campos son obligatorios")
            return 
        }

        const codeExist= this.products.find(p => p.code === product.code)
        if(codeExist){
            console.error("El producto con el mismo codigo ya existe");
            return
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
                return product;
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
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail= thumbnail
        this.code=code
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

console.log(pruebaDeProductos.getProductById(5));