import { Component, OnInit } from '@angular/core';

import {
  NbGetters,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';

import { Product } from '../../../core/data/products';
import { ProductsService } from '../../../core/mock/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  customColumn = 'name';
  defaultColumns = [
    'sku', 'description', 'weight', 'price'
  ];
  allColumns = [
    this.customColumn, ...this.defaultColumns
  ];
  headers = [
    'Nazwa i zdjęcie', 'SKU', 'Opis', 'Waga netto (g)', 'Cena (zł)'
  ];

  products: Product[];
  dataSource: NbTreeGridDataSource<Product>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private service: ProductsService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Product>
  ) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe((products) => {
      this.products = products;
      this.buildTable();
    });
  }

  buildTable(): void {
    const getters: NbGetters<Product, Product> = {
      dataGetter: (node: Product) => node,
      childrenGetter: (node: any) => node.variants
    };
    this.dataSource = this.dataSourceBuilder.create(this.products, getters);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number): number {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

}
