import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductsService } from '../../../core/services/products.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
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
export class ListComponent implements OnInit, OnDestroy {
  searchTerm = new FormControl('');

  filteredProducts$: Observable<Product[]>;
  private destroy$ = new Subject<void>();

  constructor(private productsService: ProductsService) {
    this.filteredProducts$ = this.initializeProducts();
  }

  ngOnInit(): void {
    this.setupSearch();
  }

  private initializeProducts(): Observable<Product[]> {
    return this.productsService.products$.pipe(
      map(products => this.mapProductsWithType(products)),
      takeUntil(this.destroy$)
    );
  }

  private setupSearch(): void {
    // Usando valueChanges do FormControl para observar mudanças no input
    this.filteredProducts$ = this.searchTerm.valueChanges.pipe(
      startWith(''), // Emite valor vazio inicial
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.productsService.searchProducts(term || '')),
      map((products: Product[])=> this.mapProductsWithType(products)),
      takeUntil(this.destroy$)
    );
  }

  private mapProductsWithType(products: Product[]): Product[] {
    return products.map((product: Product) => ({
      ...product,
      type: TypeLabel.get(product.type) || ''
    }));
  }

  handleOnDelete(id: number) {
    this.productsService.deleteProduct(id);
    this.filteredProducts$ = this.initializeProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
