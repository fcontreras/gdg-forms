import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  //Local models
  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products = this.productsService.getProductsInStock();
  }

}
