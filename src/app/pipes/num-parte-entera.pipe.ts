import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numParteEntera'
})
export class NumParteEnteraPipe implements PipeTransform {

  transform(value: number) {
    if (value) {
      let numero = value.toString().split('.');
      return  numero[0];
    }
  }
}
