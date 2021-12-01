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

  actualizarCantidadItemCarrito(id, cantidad) {
    let carritoGeneral = JSON.parse(localStorage.getItem('carrito_compras'));
    console.log('bbb');

    //encontrar el id y actualizar cantidad
    carritoGeneral.forEach((element) => {
      if (element.id == id) {
        element.cantidad = cantidad;
      }
    });
    localStorage.setItem('carrito_compras', JSON.stringify(carritoGeneral));
  }

  //generar id variante angular
  agregarProductoCarrito(producto, cliente) {
    let data = {
      id: 1,
      producto: producto.id,
      cliente: JSON.parse(localStorage.getItem('user_data')).dni,
      cantidad: producto.cantidad,
      stock: producto.stock,
      // variedad: dataCarrito.variedad,
      // titulo_variedad: 'Pulgadas',
      ruta: producto.ruta,
      name: producto.name,
      precio: producto.precioDescuento
        ? producto.precioDescuento
        : producto.precioOriginal,

      precioOriginal: producto.precioOriginal,
      precioDescuento: producto.precioDescuento,
    };
    console.log('data', data);
    console.log('producto', producto);

    let carritoGeneral = JSON.parse(localStorage.getItem('carrito_compras'));
    //Validar que produto no exista en el carrito
    let existeProducto = false;

    if (carritoGeneral) {
      existeProducto = carritoGeneral.some((element) => {
        return element.producto == producto.id;
      });
      console.log('existeProducto', existeProducto);
    }
    //Agregar al carrito actual

    if (existeProducto) {
      return false;
      //actualizarlo
      //  eliminar y agregar item
    } else {
      let carritoTotal;
      if (carritoGeneral) {
        //buscar el idmaximo
        console.log('carritoGeneral', carritoGeneral);
        let idMaximo = carritoGeneral.reduce((prev, item, index) => {
          return Math.max(prev, item.id);
        }, Number.MIN_VALUE);

        console.log('idMaximo', idMaximo);
        data.id = idMaximo + 1;

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
