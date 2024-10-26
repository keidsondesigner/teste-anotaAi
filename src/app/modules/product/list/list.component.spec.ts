import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../../core/services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { mockProducts } from '../../../core/mocks/product.mock';
import { Product } from '../../../core/models/product.model';
import { ListComponent } from './list.component';

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
            deleteProduct: jest.fn((id: number) => {
              return of(mockProducts.filter(product => product.id !== id));
            }),
            searchProducts: jest.fn((searchTerm: string) => {
              const normalizedSearchTerm = searchTerm.toLowerCase();
              return of(
                mockProducts.filter(product =>
                  product.title.toLowerCase().includes(normalizedSearchTerm) ||
                  product.description.toLowerCase().includes(normalizedSearchTerm)
                )
              );
            })
          }
        }
      ]
    }).compileComponents();

    service = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should search products correctly', (done) => {
    const searchTerm = 'fatia';
    component.searchTerm.setValue(searchTerm);

    component.filteredProducts$.subscribe((products: Product[]) => {
      expect(products.length).toBeGreaterThan(0); // Ajuste conforme o esperado
      expect(products.some((product: Product) => product.title.toLowerCase().includes('fatia'))).toBe(true);
      done();
    });
  });

  it('should call deleteProduct correctly', () => {
    const spy = jest.spyOn(service, 'deleteProduct');

    // Chama o método handleOnDelete com um ID de produto
    component.handleOnDelete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });
});
