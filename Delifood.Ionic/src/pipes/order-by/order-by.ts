import { Pipe, PipeTransform } from '@angular/core';
import { UtilsHelpers } from '../../app/helpers/utilHelps';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<any>, args: string) {
    let _ret = [];
    let _args = args.replace('-', '');
    
    if (args.indexOf('-') > -1) {
      _ret = (<Array<any>>UtilsHelpers.data.sorting(value, _args)).reverse();
    } else {
      _ret = (<Array<any>>UtilsHelpers.data.sorting(value, args));
    }
    return _ret;
  }
}
