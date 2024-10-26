import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { mockProducts } from '../mocks/product.mock';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TypeLabel } from '../enums/types';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all products on creation', () => {
    service.products$.subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });
  it('should return filtered products correctly', (done) => {
    const searchTerm = 'pizza';

    // Atualiza o productsSubject com os produtos mockados
    service['productsSubject'].next(mockProducts);

    service.searchProducts(searchTerm).subscribe((filteredProducts: Product[]) => {
      expect(filteredProducts.length).toBeGreaterThan(0);
      expect(filteredProducts.every((product: Product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )).toBe(true);
      done();
    });
  });

  it('should delete a product by ID', (done) => {
    // Inicializa com produtos
    service['productsSubject'].next(mockProducts);

    service.deleteProduct(1); // Deleta o produto com ID 1

    service.products$.subscribe((products: Product[]) => {
      expect(products.find((product: Product) => product.id === 1)).toBeUndefined();
      done();
    });
  });
});
