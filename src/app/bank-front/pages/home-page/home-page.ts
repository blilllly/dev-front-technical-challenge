import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Footer } from '../../../shared/footer/footer';
import { ProductTable } from '../../../products/components/product-table/product-table';
import { ProductService } from '../../../products/services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [Footer, ProductTable],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  productService = inject(ProductService);

  productResource = rxResource({
    stream: () => this.productService.getProducts(),
  });

}
