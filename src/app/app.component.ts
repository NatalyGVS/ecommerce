import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tienda';

  ngOnInit(): void {
    let categorias: any[] = [
      {
        id: 'cat1',
        name: 'categoria-1',
        cantidad: 200,
        icono: 'ci-iphone',
      },
      {
        id: 'cat2',
        name: 'categoria-2',
        cantidad: 200,
        icono: 'ci-iphone',
      },
      {
        id: 'cat3',
        name: 'categoria-3',
        cantidad: 200,
        icono: 'ci-like',
      },
      {
        id: 'cat4',
        name: 'categoria-4',
        cantidad: 200,
        icono: 'ci-lock',
      },
    ];

    let productos: any[] = [
      {
        id: 'px1',
        name: 'producto 1',
        stock: 200,
        precio: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px2',
        name: 'producto 2',
        stock: 200,
        precio: 50,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px3',
        name: 'producto 3',
        stock: 200,
        precio: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px4',
        name: 'producto 4',
        stock: 200,
        precio: 100,
        categoria: 'categoria-3',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
      {
        id: 'px5',
        name: 'producto 5',
        stock: 200,
        precio: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px6',
        name: 'producto 6',
        stock: 200,
        precio: 50,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px7',
        name: 'producto 7',
        stock: 200,
        precio: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px8',
        name: 'producto 8',
        stock: 200,
        precio: 100,
        categoria: 'categoria-4',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
      {
        id: 'px9',
        name: 'producto 9',
        stock: 200,
        precio: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px10',
        name: 'producto 10',
        stock: 200,
        precio: 50,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px11',
        name: 'producto 11',
        stock: 200,
        precio: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px12',
        name: 'producto 12',
        stock: 200,
        precio: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },

      {
        id: 'px13',
        name: 'producto 13',
        stock: 200,
        precio: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px14',
        name: 'producto 14',
        stock: 200,
        precio: 100,
        categoria: 'categoria-3',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
      {
        id: 'px15',
        name: 'producto 15',
        stock: 200,
        precio: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px16',
        name: 'producto 16',
        stock: 200,
        precio: 50,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px17',
        name: 'producto 17',
        stock: 200,
        precio: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px18',
        name: 'producto 18',
        stock: 200,
        precio: 100,
        categoria: 'categoria-4',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
    ];

    localStorage.setItem('categorias', JSON.stringify(categorias));
    localStorage.setItem('productos', JSON.stringify(productos));
  }
}
