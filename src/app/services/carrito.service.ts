import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  public carrito;
  constructor() {}

  getCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito_compras'));

    this.carrito = carrito != undefined ? carrito : [];
    return this.carrito;
  }

  eliminarItemCarrito(dataCarrito, id) {
    let newData = dataCarrito.filter(function (item) {
      return item.id !== id;
    });
    localStorage.setItem('carrito_compras', JSON.stringify(newData));
    return newData;
  }
}
