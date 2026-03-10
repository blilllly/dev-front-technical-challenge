import { Pipe, type PipeTransform } from '@angular/core';
import { FinancialProduct } from '../products/interfaces/financial-product.interface';

@Pipe({
  name: 'ProductFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(value: FinancialProduct[], search: string): FinancialProduct[] {
    if (!search) return value;

    search = search.toLowerCase();

    return value.filter((product) => product.name.toLowerCase().includes(search));
  }
}
