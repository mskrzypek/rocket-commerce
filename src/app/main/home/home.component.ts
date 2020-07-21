import { Component, OnInit } from '@angular/core';

import { Product } from '../../core/data/products';
import { ProductsService } from '../../core/mock/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(
    private service: ProductsService
  ) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
