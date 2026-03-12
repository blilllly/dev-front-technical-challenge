import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductTable } from '../../../products/components/product-table/product-table';
import { ProductService } from '../../../products/services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../../shared/toaster/toaster-service';
@Component({
  selector: 'list-page',
  imports: [ProductTable],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  private productService = inject(ProductService);
  private toasterService = inject(ToasterService);

  productResource = rxResource({
    stream: () => this.productService.getProducts(),
  });

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toasterService.show('Eliminado', 'Producto eliminado correctamente', 'success');
        this.productResource.reload();
      },
      error: (error) => {
        this.toasterService.show('Error', 'Error al eliminar el producto', 'danger');
        console.error('Error al eliminar el producto:', error);
      },
    });
  }
}
