import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FinancialProduct } from '../../interfaces/financial-product.interface';
import { ProductFilterPipe } from '../../../pipes/product-filter-pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'product-table',
  imports: [ProductFilterPipe, DatePipe],
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
      date_release: new Date('2000-1-1'),
      date_revision: new Date('2001-1-1'),
    },
    {
      id: '2',
      logo: 'logo',
      name: 'nombre del producto 2',
      description: 'descripción',
      date_release: new Date('2000-1-1'),
      date_revision: new Date('2001-1-1'),
    },
    {
      id: '3',
      logo: 'logo',
      name: 'nombre del producto 3',
      description: 'descripción',
      date_release: new Date('2000-1-1'),
      date_revision: new Date('2001-1-1'),
    },
    {
      id: '4',
      logo: 'logo',
      name: 'nombre del producto 4',
      description: 'descripción',
      date_release: new Date('2000-1-1'),
      date_revision: new Date('2001-1-1'),
    },
    {
      id: '5',
      logo: 'logo',
      name: 'nombre del producto 5',
      description: 'descripción',
      date_release: new Date('2000-1-1'),
      date_revision: new Date('2001-1-1'),
    },
  ]);
}
