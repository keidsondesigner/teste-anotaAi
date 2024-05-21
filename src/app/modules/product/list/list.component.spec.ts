import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../../core/services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { map, of } from 'rxjs';
import { mockProducts } from '../../../core/mocks/product.mock';
import { normalizeString } from '../../../core/utils/normalize-utils';
import { TypeLabel } from '../../../core/enums/types';
import { Product } from '../../../core/models/product.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            products$: of(mockProducts),
            getTransformedProducts: () => of(mockProducts.map(product => ({
              ...product,
              type: TypeLabel.get(product.type) || ''
            }))),
            searchAndTransformProducts: (searchTerm: string) => of(mockProducts).pipe(
              map(products => {
                const normalizedSearchTerm = normalizeString(searchTerm);
                const filteredProducts = products.filter(product =>
                  normalizeString(product.title).includes(normalizedSearchTerm) ||
                  normalizeString(product.description).includes(normalizedSearchTerm)
                );
                return filteredProducts.map(product => ({
                  ...product,
                  type: TypeLabel.get(product.type) || ''
                }));
              })
            ),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search products correctly', done => {
    const searchTerm = 'fatia';
    component.searchField.setValue(searchTerm);

    component.productsList$.subscribe(products => {
      const expectedProducts = mockProducts.filter(product =>
        normalizeString(product.title).includes(normalizeString(searchTerm)) ||
        normalizeString(product.description).includes(normalizeString(searchTerm))
      ).map(product => ({
        ...product,
        type: TypeLabel.get(product.type) || ''
      }));

      expect(products).toEqual(expectedProducts);
      done();
    });
  }, 10000);

  it('should call deleteProduct correctly', () => {
    const spy = jest.spyOn(service, 'deleteProduct');
    component.handleOnDelete(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
