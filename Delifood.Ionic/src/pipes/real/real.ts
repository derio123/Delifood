import { Pipe, PipeTransform } from '@angular/core';
import { UtilsHelpers } from '../../app/helpers/utilHelps';

@Pipe({
  name: 'real',
})
export class RealPipe implements PipeTransform {

  transform(value: number, ...args) {
    return UtilsHelpers.number.formatCurrency(value);
  }
}
