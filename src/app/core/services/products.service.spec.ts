import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { mockProducts } from '../mocks/product.mock';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', done => {
    let result: Product[] = [];
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockProducts))

    service.getAll().subscribe((products) => {
      result = products;
      expect(result).toEqual(mockProducts);
      done();
    });
  });

  it('should return products correctly', done => {
    const mockTerm = 'pizza';
    let result: Product[] = [];

    service.products$ = of(mockProducts);

    service.searchProducts(mockTerm).subscribe((products) => {
      result = products;
      expect(result.length).toEqual(2);
      done();
    });
  });
});
