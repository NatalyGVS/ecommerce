import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
declare var $;

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.css'],
})
export class ItemCarritoComponent implements OnInit {
  @Input() item: any;
  @Output() eliminar = new EventEmitter();
  @Output() itemCantidad = new EventEmitter();

  constructor(private _carritoService: CarritoService) {}

  ngOnInit(): void {}

  reduceProduct() {
    if (this.item.cantidad > 1) this.item.cantidad--;
    this._carritoService.actualizarCantidadItemCarrito(
      this.item.id,
      this.item.cantidad
    );
    this.itemCantidad.emit(this.item);
  }
  addProduct() {
    this.item.cantidad++;
    this._carritoService.actualizarCantidadItemCarrito(
      this.item.id,
      this.item.cantidad
    );
    this.itemCantidad.emit(this.item);
  }

  validar_stock() {
    console.log('this.product.stock', this.item.stock);
    console.log('this.product.cantidad', this.item.cantidad);

    //validar si esta vacio
    if (this.item.cantidad === null || parseInt(this.item.cantidad) < 1) {
      this.item.cantidad = 1;
    }

    // si supera el stock
    else if (parseInt(this.item.cantidad) > this.item.stock) {
      // $('[data-toggle="popover"]').popover('show');
      $('#inpCant-' + this.item.product).popover('show');
      this.item.cantidad = this.item.stock;

      setTimeout(function () {
        $('[data-toggle="popover"]').popover('hide');
      }, 2600);
    } else {
      //actualizarlo
      console.log('aaaa,', this.item);
      this._carritoService.actualizarCantidadItemCarrito(
        this.item.id,
        this.item.cantidad
      );
    }
    this.itemCantidad.emit(this.item);
  }

  eliminarItem(id: any) {
    this.eliminar.emit(id);
  }
}
