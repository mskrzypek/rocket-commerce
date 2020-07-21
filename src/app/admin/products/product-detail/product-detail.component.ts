import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NbToastrService, NbMenuService, NbMenuItem } from '@nebular/theme';

import { Product, Variant } from '../../../core/data/products';
import { ProductsService } from '../../../core/mock/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public product: Product;
  private menuSubscription: Subscription;

  items: NbMenuItem[] = [
    {
      title: 'Zapisz i zamknij',
      icon: 'save-outline',
      data: {
        id: 'save-close'
      }
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastrService: NbToastrService,
    private menuService: NbMenuService
  ) { }

  ngOnInit(): void {

    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.service.getProduct(+id).subscribe((product: Product) => {
        this.product = product;
        this.buildForm();
        this.items.push({
          title: 'Usuń produkt',
          icon: 'trash-2-outline',
          data: {
            id: 'remove'
          }
        });
      });
    } else {
      this.buildForm();
    }

    this.menuSubscription = this.menuService.onItemClick().subscribe((event: any) => {
      if ((event.item.data || {}).id === 'save-close') {
        this.save(true);
      }
      if ((event.item.data || {}).id === 'remove') {
        this.remove();
      }
    });

  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: [this.product ? this.product.name : '', [Validators.required, Validators.minLength(5)]],
      sku: [this.product ? this.product.sku : '', Validators.required],
      description: [this.product ? this.product.description : ''],
      weight: [this.product ? this.product.weight : '', Validators.pattern('^[0-9]*$')],
      price: [this.product ? this.product.price : '', [Validators.required, Validators.pattern('^[0-9\.]*$')]],
      image: [this.product ? this.product.image : ''],
      variants: this.fb.array([])
    });
    if (this.product !== undefined) {
      const control: FormArray = this.form.controls.variants as FormArray;
      this.product.variants.forEach((variant) => {
        control.push(this.initVariant(variant));
      });
    }
  }

  private initVariant(variant: Variant = null): FormGroup {
    return this.fb.group({
      name: [variant ? variant.name : '', [Validators.required, Validators.minLength(5)]],
      price: [variant ? variant.price : '', [Validators.required, Validators.pattern('^[0-9\.]*$')]]
    });
  }

  private afterSave(message: string, returnToList: boolean): void {
    this.toastrService.show(
      message, 'Gratulacje!', { status: 'success' }
    );
    if (returnToList) {
      this.router.navigateByUrl('/admin/products/list');
    } else {
      this.form.markAsPristine();
    }
  }

  save(returnToList: boolean = false): void {
    if ( ! this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.product) {
      Object.assign(
        this.product,
        this.form.value
        );
      this.service.updateProduct(this.product).subscribe(() => {
        this.afterSave(
          `Informacje o produkcie „${this.product.name}” zostały zaktualizowane.`, returnToList
        );
      });
    } else {
      const name = this.form.controls.name.value;
      this.service.createProduct(this.form.value).subscribe((product) => {
        this.product = product;
        this.afterSave(
          `Produkt „${name}” został utworzony.`, returnToList
        );
      });
    }
  }

  addVariant(): void {
    const control: FormArray = this.form.controls.variants as FormArray;
    const group: FormGroup = this.initVariant();
    // todo: focus first input (and remove focus from button)
    control.push(group);
  }

  removeVariant(i: number): void {
    const control = this.form.controls.variants as FormArray;
    control.removeAt(i);
  }

  remove(): void {
    if (confirm(`Czy na pewno chcesz usunąć produkt „${this.product.name}”?`)) {
      this.service.removeProduct(this.product).subscribe(() => {
        this.toastrService.show(
          `Produkt „${this.product.name}” został usunięty.`, 'Gotowe!', { status: 'success' }
        );
        this.router.navigateByUrl('/admin/products/list');
      });
    }
  }

}
