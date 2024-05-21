import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';
import { normalizeString } from '../utils/normalize-utils';
import { TypeLabel } from '../enums/types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    this.httpClient.get<Product[]>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error('Error loading products:', error);
        return of([]);
      }),
      shareReplay(1)
    ).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  private transformProducts(products: Product[]): Product[] {
    return products.map(product => {
      const typeLabel = TypeLabel.get(product.type);
      return {
        ...product,
        type: typeLabel ? typeLabel : '',
      };
    });
  }

  getTransformedProducts(): Observable<Product[]> {
    return this.products$.pipe(
      map(products => this.transformProducts(products))
    );
  }

  searchAndTransformProducts(searchTerm: string): Observable<Product[]> {
    return this.products$.pipe(
      map(products => {
        const normalizedSearchTerm = normalizeString(searchTerm);
        const filteredProducts = products.filter(product =>
          normalizeString(product.title).includes(normalizedSearchTerm) ||
          normalizeString(product.description).includes(normalizedSearchTerm)
        );
        return this.transformProducts(filteredProducts);
      })
    );
  }

  deleteProduct(productId: number) {
    this.products$.pipe(
      map(products => products.filter(product => product.id !== productId))
    ).subscribe(updatedProducts => this.productsSubject.next(updatedProducts));
  }
}
