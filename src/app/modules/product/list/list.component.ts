import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductsService } from '../../../core/services/products.service';
import {
  Observable,
  Subject,
  debounceTime,
  map,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TypeLabel } from '../../../core/enums/types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  productsList$: Observable<Product[]> = new Observable<Product[]>();
  private unsubscribe$ = new Subject<void>();

  searchField = new FormControl();

  constructor(private productsService: ProductsService) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((searchTerm) =>
          this.productsService.searchProducts(searchTerm)
        ),
        map((products) => {
          return products.map((product) => {
            const typeLabel = TypeLabel.get(product.type);
            return {
              ...product,
              type: typeLabel!,
            };
          });
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((productsList) => {
        this.productsList$ = of(productsList);
      });
  }

  loadProducts() {
    this.productsList$ = this.productsService.products$.pipe(
      map((products) => {
        return products.map((product) => {
          const typeLabel = TypeLabel.get(product.type);
          return {
            ...product,
            type: typeLabel ? typeLabel : '',
          };
        });
      })
    );
  }

  handleOnDelete(id: number) {
    this.productsService.deleteProduct(id);
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
