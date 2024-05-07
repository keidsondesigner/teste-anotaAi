import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Output() onDelete = new EventEmitter();

  @Input() product: Product = {
    description: '',
    id: 0,
    img: "",
    title: '',
    type: ''
  };
}
