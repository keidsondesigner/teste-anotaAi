import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductsService } from '../../../core/services/products.service';
import {
  Observable,
  Subject,
  debounceTime,
  startWith,
  switchMap,
} from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  productsList$: Observable<Product[]> = new Observable<Product[]>();
  searchField = new FormControl();
  private unsubscribe$ = new Subject<void>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsList$ = this.searchField.valueChanges.pipe(
      startWith(''), // Isso vai iniciar o fluxo com uma string vazia, carregando todos os produtos inicialmente
      debounceTime(500),
      switchMap(searchTerm => this.productsService.searchAndTransformProducts(searchTerm)),
    );
  }

  loadProducts() {
    this.productsList$ = this.productsService.getTransformedProducts();
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
