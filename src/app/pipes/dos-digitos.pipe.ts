import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dosDigitos',
})
export class DosDigitosPipe implements PipeTransform {
  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/
  transform(value: number) {
    if (value <= 9) {
      return '0' + value;
    }
    return value;
  }
}
