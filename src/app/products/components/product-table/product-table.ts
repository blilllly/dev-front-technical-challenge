import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  private filterPipe = new ProductFilterPipe();

  deleteDialog = viewChild(DeleteDialog);

  searchQuery = signal('');
  pageSize = signal(5);

  products = input.required<ResponseBP>();

  deleteProduct = output<string>();

  filteredProducts = computed(() =>
    this.filterPipe.transform(this.products().data, this.searchQuery()),
  );

  visibleProducts = computed(() => this.filteredProducts().slice(0, this.pageSize()));

  editProduct(productId: string) {
    this.router.navigate(['/edit', productId]);
  }

  openDeleteDialog(productId: string, productName: string) {
    this.deleteDialog()?.show(productId, productName);
  }
}
