// Desafio entregable 1° 


class ProductManager{

    constructor(){
        this.products=[]
    }

    getProducts(){
        return this.products;
    }

    addProduct(product){
        if(this.products.length === 0){
            product.id =1;
        }else{
            product.id= this.products[this.products.length -1] + 1
        }

        this.products.push(product);
    }
    

    getProductById(id){
        const product= this.products.find(product => product.id === id)

        if(!product){
            return "Error"
        }else{
            return product
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

const pruebaDeProductos = new ProductManager()

// agregando producto 1:
/* - title: “producto prueba”
- description:”Este es un producto prueba”
- price:200,
- thumbnail:”Sin imagen”
- code:”abc123”,
- stock:25
*/

pruebaDeProductos.addProduct(new Product("Producto Prueba", "Este es un producto prueba", 200, "sin imagen", "ABC123", 25))


// mostrar el producto agregado
console.log(pruebaDeProductos.getProducts());


// ver si arroja error o si encuentra el producto getProductById

console.log(pruebaDeProductos.getProductById(2));