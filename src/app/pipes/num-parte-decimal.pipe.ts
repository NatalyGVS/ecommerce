import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numParteDecimal',
})
export class NumParteDecimalPipe implements PipeTransform {
  /*
  transform(value: number) {
    if (value <= 9) {
      return '0' + value;
    }
    return value;
  }
  */
  transform(value: number) {
    if (value) {
      let numero = value.toString().split('.');
      return numero[1]
        ? numero[1].length === 1
          ? numero[1] + '0'
          : numero[1]
        : '';
    }
  }
}
