import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ResponseBP } from '../../interfaces/responseBP.interface';
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

  products = input.required<ResponseBP>();
}
