import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService{
    products: Product[] = [];

    insertProduct(title: string, description: string, price: number): string{
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId,title, description, price);
        this.products.push(newProduct);

        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    getProduct(productId: string){
        const product = this.findProduct(productId)[0];
        return {...product}
    }

    updateProduct(productId: string, title: string, desc: string, price: number){
        const [product, index] = this.findProduct(productId);
        const updateProduct = { ...product }
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.description = desc;
        }
        if(price){
            updateProduct.price = price;
        }

        this.products[index] = updateProduct;

    }

    deleteProduct(prodId: string){
        const [_, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
    }

    findProduct(productId: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException(`Could not found product with id: ${productId}`);
        }
        return [product, productIndex];
    }
}