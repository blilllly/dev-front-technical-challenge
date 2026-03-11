import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ResponseBP } from '../../interfaces/responseBP.interface';
import { ProductFilterPipe } from '../../../pipes/product-filter-pipe';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'product-table',
  imports: [ProductFilterPipe, DatePipe, RouterLink],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {

  private router = inject(Router);

  searchQuery = signal('');

  products = input.required<ResponseBP>();

  handleAction(event: Event, productId: string) {
    const selectElement = event.target as HTMLSelectElement;
    const action = selectElement.value;
    if (action === 'edit') {
      this.router.navigate(['/edit', productId]);
    } else if (action === 'delete') {
      // Lógica para eliminar el producto
      console.log(`Eliminar producto con ID: ${productId}`);
    }
  }
}
