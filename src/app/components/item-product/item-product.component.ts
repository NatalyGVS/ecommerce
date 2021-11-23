import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.css'],
})
export class ItemProductComponent implements OnInit {
  @Input() product: any;
  constructor() {}

  ngOnInit(): void {
    let precio: string;

    if (this.product.precioDescuento) {
      precio = this.product.precioDescuento.toString().split('.');
    } else if (this.product.precioOriginal) {
      precio = this.product.precioOriginal.toString().split('.');
    }
    if (precio) {
      this.product.numEntero = precio[0];
      this.product.numDecimal = precio[1]
        ? precio[1].length === 1
          ? precio[1] + '0'
          : precio[1]
        : '00';
    }
  }
}
