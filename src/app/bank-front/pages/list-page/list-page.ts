import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductTable } from '../../../products/components/product-table/product-table';
import { ProductService } from '../../../products/services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'list-page',
  imports: [ProductTable],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  productService = inject(ProductService);

  productResource = rxResource({
    stream: () => this.productService.getProducts(),
  });

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productResource.reload();
    });
  }
}
