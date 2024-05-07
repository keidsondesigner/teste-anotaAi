import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { mockProducts } from '../../../mocks/product.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../../shared/services/products.service';
import { normalizeString } from '../../../shared/utils/normalize-utils';
import { Product } from '../../../models/product.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let httpClient: HttpClient;
  let service: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule],
      providers: [
        HttpClient,
        {
          provide: ProductsService,
          useValue: {
            products$: of(mockProducts),
            getAll: () => of(mockProducts),
            deleteProduct: (id: number) => of({}),
            searchProducts(searchTerm: string): Observable<Product[]> {
              return of(mockProducts).pipe(
                map(products => {
                  const normalizedSearchTerm = normalizeString(searchTerm);
                  return products.filter(product =>
                    normalizeString(product.title).includes(normalizedSearchTerm) ||
                    normalizeString(product.description).includes(normalizedSearchTerm)
                  );
                })
              );
            },
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search products correctly', done => {
    const searchTerm = 'fatia';
    component.onSearchTermChange({ target: { value: searchTerm } } as unknown as Event);

    component.filteredProducts$.subscribe((products) => {
      expect(component).toBeTruthy();
      done();
    });
  });

  it('should call deleteProduct correctly', () => {
    const spy = jest.spyOn(service, 'deleteProduct');
    component.handleOnDelete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });
});
