import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FinancialProduct } from '../../interfaces/financial-product.interface';
import { ProductFilterPipe } from '../../../pipes/product-filter-pipe';

@Component({
  selector: 'product-table',
  imports: [ProductFilterPipe],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  searchQuery = signal('');

  products = signal<FinancialProduct[]>([
    {
      id: '1',
      logo: 'logo',
      name: 'nombre del producto 1',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '2',
      logo: 'logo',
      name: 'nombre del producto 2',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '3',
      logo: 'logo',
      name: 'nombre del producto 3',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '4',
      logo: 'logo',
      name: 'nombre del producto 4',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
    {
      id: '5',
      logo: 'logo',
      name: 'nombre del producto 5',
      description: 'descripción',
      release_date: '01/01/2000',
      review_date: '01/01/2001',
    },
  ]);
}
