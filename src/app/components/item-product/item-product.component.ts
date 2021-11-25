import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var $;

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.css'],
})
export class ItemProductComponent implements OnInit {
  @Input() product: any;
  @Input() productCarrito: any;
  @Output() productModal = new EventEmitter();

  public cantidad: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.product.cantidad = 1;
  }

  reduceProduct() {
    if (this.cantidad > 1) this.product.cantidad--;
    // this.product.cantidad = this.cantidad;
  }
  addProduct() {
    this.product.cantidad++;
    // this.product.cantidad = this.product.cantidad;
  }

  addCarrito(product: any) {
    this.productModal.emit(product);
  }

}
