import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ProductsService } from '../../shared/services/products.service';
import { Observable, Subject, debounceTime, of, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  filteredProducts$: Observable<Product[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
  ) {
    this.filteredProducts$ = this.productsService.products$;
  }

  onSearchTermChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productsService.searchProducts(searchTerm).pipe(
      debounceTime(500),
      takeUntil(this.unsubscribe$)
    ).subscribe(filteredProducts => {
      this.filteredProducts$ = of(filteredProducts);
    });
  }

  handleOnEdit(id: number) {
    alert(`Excluír item: ${id}`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
