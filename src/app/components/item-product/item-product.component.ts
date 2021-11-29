import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
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

  public btn_cart = false;

  constructor(private _carritoService: CarritoService) {}

  ngOnInit(): void {
    this.product.cantidad = 1;
    //popover
    this.inicializar_popover();
  }

  inicializar_popover() {
    $('[data-toggle="popover"]').popover('hide');
  }
  validar_stock() {
    console.log('this.product.stock', this.product.stock);
    console.log('this.product.cantidad', this.product.cantidad);

    //validar si esta vacio
    if (this.product.cantidad === null || parseInt(this.product.cantidad) < 1) {
      this.product.cantidad = 1;
    }

    // si supera el stock
    if (parseInt(this.product.cantidad) > this.product.stock) {
      // $('[data-toggle="popover"]').popover('show');
      $('#inpCant-' + this.product.id).popover('show');
      this.product.cantidad = this.product.stock;

      setTimeout(function () {
        $('[data-toggle="popover"]').popover('hide');
      }, 2600);
    }
  }

  reduceProduct() {
    if (this.product.cantidad > 1) this.product.cantidad--;
    // this.product.cantidad = this.cantidad;
  }
  addProduct() {
    this.product.cantidad++;
    this.validar_stock();
    // this.product.cantidad = this.product.cantidad;
  }

  addCarrito(product: any) {
    this.btn_cart = true;
    console.log('product', product);
    setTimeout(() => {
      this.btn_cart = false;
      this._carritoService.agregarProductoCarrito(product, null);
      this.productModal.emit(product);
    }, 900);
  }
}
