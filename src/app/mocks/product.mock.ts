import { Product } from "../models/product.model";

export const productAMock = { id: 1, title: 'Fatia pizza', description: 'It has survived not only five centuries,', img: 'pizza-fatia.jpg', type: '1' };
const productBMock = { id: 2, title: 'Pizza inteira', description: 'It has survived not only five centuries,', img: 'pizza-inteira.jpg', type: '2' };

export const mockProducts: Product[] = [
  productAMock,
  productBMock
];
