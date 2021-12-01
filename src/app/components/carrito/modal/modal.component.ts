import { Router } from '@angular/router';
import { ItemProductComponent } from '../../item-product/item-product.component';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any; //importar jquery

@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() product: any;
  constructor(private _router: Router) {}

  ngOnInit(): void {}
  irCarrito() {
    $('#modalCarritoCompras').modal('hide');
    this._router.navigate(['/carrito']);
  }
}
