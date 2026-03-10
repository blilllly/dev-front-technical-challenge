import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'product-table',
  imports: [],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {}
