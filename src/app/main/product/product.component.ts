import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../core/data/products';
import { ProductsService } from '../../core/mock/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;

  constructor(
    private service: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.service.getProduct(+id).subscribe((product: Product) => {
      this.product = product;
    });
  }

}
