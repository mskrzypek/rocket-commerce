import { Observable } from 'rxjs';

export interface Product {
  id: number;
  sku: string;
  image: string;
  name: string;
  description: string;
  weight: number;
  price: number;
  variants: Variant[];
}

export interface Variant {
  name: string;
  price: number;
}

export abstract class ProductsData {
  abstract getAllProducts(): Observable<Product[]>;
  abstract getProduct(id: number): Observable<Product>;
  abstract createProduct(object: any): Observable<Product>;
  abstract updateProduct(product: Product): Observable<Product>;
  abstract removeProduct(product: Product): Observable<object>;
}
