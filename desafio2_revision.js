const fs=require("fs")

class ProductManager{
    constructor(filename){
        this.path= filename
        fs.writeFileSync(filename, "")
        if(fs.existsSync(filename)){
            try{
                let products= fs.readFileSync(filename, "utf-8")
                this.products= JSON.parse(products)
            }catch(error){
                this.products=[];
            }
        }else{
            this.products=[];
        }
    }

    async saveFile(){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,"\t"))
            // return true
        }catch(error){
            console.log(error);
            // return false
        }
    }


    addProducts(product){
        if(this.products.length === 0){
            product.id = 1
        }else{
            product.id= this.products.length + 1
        }

        this.products.push(product);
    }

    getProducts(){
        console.log(this.products);
        }

    getProductsById(id){
            const product= this.products.find(product => product.id === id)
            console.log(product);
            if(!product){
              console.log("No encontrado" );
            }else{
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
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail= thumbnail
        this.code=code
        this.stock=stock
    }
    
}


const product1= new Product("Producto 1", "Descripcion", 240 ,"-", "1", 23)

const product2= new Product("Producto 2", "Descripcion", 250,"-", "2", 21)

const product3= new Product("Producto 3", "Descripcion", 224,"-", "3", 23)

const prueba1= new ProductManager("Productos.json")



prueba1.addProducts(product1);

prueba1.addProducts(product2);

prueba1.addProducts(product3);



prueba1.getProducts()

console.log("Producto s/ Id");
prueba1.getProductsById(1); 

prueba1.saveFile()

prueba1.updateProduct(1)

prueba1.deleteProduct(2)

prueba1.getProducts()

