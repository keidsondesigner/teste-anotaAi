import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { mockProducts } from '../mocks/product.mock';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TypeLabel } from '../enums/types';

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

  it('should load and transform products correctly', done => {
    const transformedProducts = mockProducts.map(product => ({
      ...product,
      type: TypeLabel.get(product.type) || '',
    }));

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockProducts));

    service.getTransformedProducts().subscribe((products) => {
      expect(products).toEqual(transformedProducts);
      done();
    });
  });

  it('should search and transform products correctly', done => {
    const searchTerm = 'pizza';
    const transformedProducts = mockProducts.map(product => ({
      ...product,
      type: TypeLabel.get(product.type) || '',
    }));

    service.products$ = of(mockProducts);

    service.searchAndTransformProducts(searchTerm).subscribe((products) => {
      const expectedProducts = transformedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(products).toEqual(expectedProducts);
      done();
    });
  });

  it('should call deleteProduct correctly', done => {
    const productIdToDelete = 1;
    const updatedProducts = mockProducts.filter(product => product.id !== productIdToDelete);

    service.products$ = of(mockProducts);
    service.deleteProduct(productIdToDelete);

    service.products$.subscribe((products) => {
      expect(products).toEqual(updatedProducts);
      done();
    });
  });

});
