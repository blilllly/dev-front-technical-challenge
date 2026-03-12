import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ResponseBP } from '../../interfaces/responseBP.interface';
import { ProductFilterPipe } from '../../../pipes/product-filter-pipe';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeleteDialog } from '../../../bank-front/pages/delete-dialog/delete-dialog';

@Component({
  selector: 'product-table',
  imports: [ProductFilterPipe, DatePipe, RouterLink, DeleteDialog],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  private router = inject(Router);
  deleteDialog = viewChild(DeleteDialog);

  searchQuery = signal('');

  products = input.required<ResponseBP>();

  handleAction(event: Event, productId: string, productName: string) {
    const selectElement = event.target as HTMLSelectElement;
    const action = selectElement.value;
    if (action === 'edit') {
      this.router.navigate(['/edit', productId]);
    } else if (action === 'delete') {
      this.deleteDialog()?.show(productId, productName);
    }
  }

  deleteProduct = output<string>();
}
