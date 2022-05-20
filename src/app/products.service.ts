import { Injectable } from '@angular/core';
import { Product } from "./product";
import { products } from "../assets/mock-products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = products;

  constructor() { }

  getProductsInStock(): Product[] {
    return this.products.filter( p => p.stock > 0)
  }
}
