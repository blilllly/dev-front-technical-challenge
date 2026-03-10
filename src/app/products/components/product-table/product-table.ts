import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FinancialProduct } from '../../interfaces/financial-product.interface';

@Component({
  selector: 'product-table',
  imports: [],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  products = signal<FinancialProduct[]>([
    {
      id: '1',
      logo: 'logo',
      name: 'nombre del producto',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '2',
      logo: 'logo',
      name: 'nombre del producto',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '3',
      logo: 'logo',
      name: 'nombre del producto',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '4',
      logo: 'logo',
      name: 'nombre del producto',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '5',
      logo: 'logo',
      name: 'nombre del producto',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
  ]);
}
