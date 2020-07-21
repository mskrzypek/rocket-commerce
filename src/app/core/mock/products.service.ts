import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Product, Variant, ProductsData } from '../data/products';


@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ProductsData {

  private id: number;

  private variants: Variant[] = [
    {
      name: 'Opakowanie z autografem Roberta Lewandowskiego',
      price: 71
    },
    {
      name: 'Wersja z Twoim imieniem nadrukowanym na opakowaniu',
      price: 59
    },
    {
      name: 'Czekoladki ze zwiększoną ilością alkoholu w nadzieniu',
      price: 49
    }
  ];

  private products: Product[] = [
    {
      id: 1,
      sku: 'MB1412',
      image: '/assets/products/MB1412.jpg',
      name: 'Ballotin Gold no.2 Pearls. Czekoladki',
      description: 'Balotynka z czekoladkami zapakowana w złoty ozdobny papier. ' +
                   'W środku znajdują się czekoladowe perły o gramaturze 215g.',
      weight: 215,
      price: 51.0,
      variants: [
        this.variants[0]
      ]
    }, {
      id: 2,
      sku: 'MB4597',
      image: '/assets/products/MB4597.jpg',
      name: 'Bombonierka dla kobiety Finesse White no.2 Super Babeczka',
      description: 'Bombonierka Finesse, która zachwyca eleganckim wyglądem i słodkim wnętrzem. ' +
                   'W środku mix 9 belgijskich czekoladek. Wspaniały prezent z okazji Dnia Kobiet. ' +
                   'Pudełeczko z możliwością nadruku Twojego imienia.',
      weight: 130,
      price: 49.0,
      variants: [
        this.variants[1]
      ]
    }, {
      id: 3,
      sku: 'MB2531',
      image: '/assets/products/MB2531.jpg',
      name: 'Prezent dla dziewczyny na imieniny. Blister 30 cm z pralinkami mix bez alkoholu',
      description: 'Blister z bordową nakładką skrywa w swym wnętrzu 120g pralin z nadzieniami bez ' +
                   'dodatku alkoholu.',
      weight: 120,
      price: 36.0,
      variants: []
    }, {
      id: 4,
      sku: 'MB3660',
      image: '/assets/products/MB3660.jpg',
      name: 'Czekoladki So Sweet Mini no.1 Kolekcja limitowana',
      description: 'Najmniejsza bombonierka z kolekcji So Sweet Premium! Różowo-białe wieczko udekorowana ' +
                   'uroczymi, złotymi kropeczkami. Wnętrze skrywa limitowaną kolekcję pralinek o równie ' +
                   'słodkim smaku i wyglądzie!',
      weight: 100,
      price: 39.0,
      variants: []
    }, {
      id: 5,
      sku: 'MB3520',
      image: '/assets/products/MB3520.jpg',
      name: 'Czekoladki Vintage White no.2',
      description: 'Biała bombonierka z kolekcji Vintage z klasycznym wzorem na wieczku. W środku na ' +
                   'specjalnej wytłoczce znajduje się osiemnaście belgijskich czekoladek w różnych ' +
                   'smakach i kształtach.',
      weight: 250,
      price: 109.0,
      variants: []
    }, {
      id: 6,
      sku: 'MB3661',
      image: '/assets/products/MB3661.jpg',
      name: 'So Sweet Medium no.1 Kolekcja limitowana, Czekoladki belgijskie',
      description: 'Bombonierka z limitowanej kolekcji So Sweet! Wewnątrz limitowany zestaw belgijskich ' +
                   'pralin oblany mleczną, białą i deserową czekoladą.',
      weight: 185,
      price: 65.0,
      variants: []
    }, {
      id: 7,
      sku: 'MB4754',
      image: '/assets/products/MB4754.jpg',
      name: 'Czekoladki Mini Ballotin White no.5',
      description: 'Klasyczna balotynka w kolorze białym z całorocznym nadrukiem. W swym wnętrzu skrywa ' +
                   'zestaw 10 pralin m.in. z dodatkiem alkoholu, orzechowych, owocowych i inne.',
      weight: 140,
      price: 39.0,
      variants: [
        this.variants[2]
      ]
    }, {
      id: 8,
      sku: 'MB3968',
      image: '/assets/products/MB3968.jpg',
      name: 'Czekoladki Finesse Black-White no.1',
      description: 'Elegancka bombonierka z kolekcji Finesse w biało-czarnym kolorze. W środku znajdują się ' +
                   '4 belgijskie pralinki o różnych kształtach i smakach.',
      weight: 60,
      price: 27.0,
      variants: []
    }
  ];

  constructor() {
    super();
    this.id = this.products.length; // mock unique id (this should be done by backend)
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    return of(this.products.find(item => item.id === id));
  }

  createProduct(object: any): Observable<Product> {
    const product: Product = {
      id: ++this.id, ...object // increment global id
    };
    this.products.push(product);
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex(
      (item: any) => item.id === product.id
    );
    this.products[index] = product;
    return of(product);
  }

  removeProduct(product: Product): Observable<object> {
    this.products = this.products.filter(
      (item: any) => item.id !== product.id
    );
    return of({}); // return empty observable
  }

}
