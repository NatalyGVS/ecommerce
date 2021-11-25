import { ItemProductComponent } from './../../item-product/item-product.component';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any; //importar jquery

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() product: any;
  constructor() {}

  ngOnInit(): void {

  }
  irCarrito() {
    $('#modalCarritoCompras').modal('hide');
  }
}
