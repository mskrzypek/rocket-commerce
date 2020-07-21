import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbTreeGridModule,
  NbCardModule,
  NbInputModule,
  NbTooltipModule,
  NbButtonModule,
  NbIconModule,
  NbContextMenuModule
} from '@nebular/theme/';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [ProductsComponent, ProductListComponent, ProductDetailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductsRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbInputModule,
    NbTooltipModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbContextMenuModule,
  ]
})
export class ProductsModule { }
