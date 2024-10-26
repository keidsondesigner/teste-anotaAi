import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, startWith, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { normalizeString } from '../utils/normalize-utils';

@Injectable({
  providedIn: 'root'
})
export class ProductsService  {
  private readonly baseUrl = environment.apiUrl;
  private readonly productsSubject = new BehaviorSubject<Product[]>([]);
  readonly products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.httpClient.get<Product[]>(this.baseUrl).pipe(
      catchError(this.handleError),
      shareReplay(1)
    ).subscribe({
      next: (products) => this.productsSubject.next(products),
      error: (error) => this.handleError(error)
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Erro ao carregar produtos. Tente novamente mais tarde.'));
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.products$.pipe(
      map(products => {
        if (!searchTerm.trim()) {
          return products;
        }

        const normalizedSearchTerm = normalizeString(searchTerm);
        return products.filter(product =>
          normalizeString(product.title).includes(normalizedSearchTerm) ||
          normalizeString(product.description).includes(normalizedSearchTerm)
        );
      }),
      startWith([]) // Começa com array vazio enquanto carrega
    );
  }

  deleteProduct(productId: number): void {
    const currentProducts = this.productsSubject.getValue(); // Obtém os produtos atuais
    const updatedProducts = currentProducts.filter((product: Product) => product.id !== productId); // Filtra o produto a ser excluído
    this.productsSubject.next(updatedProducts); // Atualiza o productsSubject sem criar ciclo
  }

}
