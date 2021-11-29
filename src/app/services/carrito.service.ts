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
  agregarProductoCarrito(producto, cliente) {
    let data = {
      id: 'C00x',
      producto: producto.id,
      cliente: JSON.parse(localStorage.getItem('user_data')).dni,
      cantidad: producto.cantidad,
      // variedad: dataCarrito.variedad,
      // titulo_variedad: 'Pulgadas',
      ruta: producto.ruta,
      name: producto.name,
      precio: producto.precio,
    };

    let carritoGeneral = JSON.parse(localStorage.getItem('carrito_compras'));
    //Validar que produto no exista en el carrito
    let existeProducto = false;

    if (carritoGeneral) {
      existeProducto = carritoGeneral.some((element) => {
        return (element.producto == producto.id);
      });
      console.log('existeProducto', existeProducto);
    }
    //Agregar al carrito actual

    if (existeProducto) {
      return false;
    } else {
      let carritoTotal;
      if (carritoGeneral) {
        carritoTotal = [...carritoGeneral, ...[data]];
        console.log('carritoTotal', carritoTotal);
      } else {
        carritoTotal = [data];
      }
      localStorage.setItem('carrito_compras', JSON.stringify(carritoTotal));
      return true;
    }
  }
}
