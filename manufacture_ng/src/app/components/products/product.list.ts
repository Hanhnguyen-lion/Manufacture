import { Component, OnInit } from '@angular/core';
import { ProductEntity } from '../../models/product';

@Component({
  selector: 'app-product.list',
  imports: [],
  templateUrl: './product.list.html',
  styleUrl: './product.list.css',
})

export class ProductList implements OnInit{

  products:ProductEntity[] = [];
  percent_product_4: number = 33;

  ngOnInit(): void {
    for (var i = 0; i < 5; i++){
      this.products.push({
        id: i+1,
        product_name: `Product:${i+1}`,
        percent_complete: i*25
      });
    } 
  }
}
