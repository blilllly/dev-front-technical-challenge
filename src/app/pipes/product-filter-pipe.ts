import { Pipe, type PipeTransform } from '@angular/core';
import { Datum } from '../products/interfaces/responseBP.interface';

@Pipe({
  name: 'ProductFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(value: Datum[], search: string): Datum[] {
    if (!search) return value;

    search = search.toLowerCase();

    return value.filter((product) => product.name.toLowerCase().includes(search));
  }
}
