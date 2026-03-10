import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from '../../../shared/footer/footer';
import { ProductTable } from '../../../products/components/product-table/product-table';

@Component({
  selector: 'app-home-page',
  imports: [Footer, ProductTable],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
