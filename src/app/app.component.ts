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
        nVentas: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px2',
        name: 'producto 2',
        stock: 200,
        precio: 50,
        nVentas: 400,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px3',
        name: 'producto 3',
        stock: 200,
        precio: 60,
        nVentas: 60,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px4',
        name: 'producto 4',
        stock: 200,
        precio: 100,
        nVentas: 45,
        categoria: 'categoria-3',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
      {
        id: 'px5',
        name: 'producto 5',
        stock: 200,
        precio: 40,
        nVentas: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px6',
        name: 'producto 6',
        stock: 200,
        precio: 50,
        nVentas: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px7',
        name: 'producto 7',
        stock: 200,
        precio: 60,
        nVentas: 140,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px8',
        name: 'producto 8',
        stock: 200,
        precio: 100,
        nVentas: 49,
        categoria: 'categoria-4',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
      {
        id: 'px9',
        name: 'producto 9',
        stock: 200,
        precio: 40,
        nVentas: 80,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px10',
        name: 'producto 10',
        stock: 200,
        precio: 50,
        nVentas: 90,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px11',
        name: 'producto 11',
        stock: 200,
        precio: 60,
        nVentas: 10,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px12',
        name: 'producto 12',
        stock: 200,
        precio: 60,
        nVentas: 30,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },

      {
        id: 'px13',
        name: 'producto 13',
        stock: 200,
        precio: 60,
        nVentas: 40,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px14',
        name: 'producto 14',
        stock: 200,
        precio: 100,
        nVentas: 70,
        categoria: 'categoria-3',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
      {
        id: 'px15',
        name: 'producto 15',
        stock: 200,
        precio: 40,
        nVentas: 10,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/01.png',
      },
      {
        id: 'px16',
        name: 'producto 16',
        stock: 200,
        precio: 50,
        nVentas: 40,
        categoria: 'categoria-1',
        icono: 'ci-iphone',
        ruta: '../assets/img/ecommerce/cart/02.png',
      },
      {
        id: 'px17',
        name: 'producto 17',
        stock: 200,
        precio: 60,
        nVentas: 40,
        categoria: 'categoria-2',
        icono: 'ci-like',
        ruta: '../assets/img/ecommerce/cart/03.png',
      },
      {
        id: 'px18',
        name: 'producto 18',
        stock: 200,
        precio: 100,
        nVentas: 90,
        categoria: 'categoria-4',
        icono: 'ci-lock',
        ruta: '../assets/img/ecommerce/cart/04.png',
      },
    ];

    let detalleProducto = {
      id: 'px18',
      name: 'producto 18',
      descripcion:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      detalleHTML: `
      <h3 class="h5 mb-3">Detalles</h3> <p>Id habitant tempor aliquam vulputate enim velit tincidunt sed. Urna sed facilisis nulla feugiat amet venenatis.
       Id suspendisse ut quis tellus aliquam pellentesque neque, semper donec.</p>'
        <ul class="pl-3">
       <li>Brand: Jordan</li>
       <li>Color: gray / red / yellow</li>
       <li>Mid-cut design</li>
       <li>Lace-up fastening</li>
       <li>Rubber outsole pods for durability and traction</li>
       <li>Moulded grooves in forefoot offer added flexibility</li>
       <li>Padded cuff with inner nodes designed to offer comfort and support around the Achilles tendon</li>
     </ul>
     <hr class="my-4">
     <h3 class="h5 mb-3">Fabric</h3>
     <ul class="pl-3">
       <li>Upper: 50% real leather, 50% textile</li>
       <li>Lining: 100% textile</li>
       <li>Sole: 100% other materials</li>
     </ul>`,

      stock: 200,
      precio: 100,
      nVentas: 90,
      portada: '?',
      categoria: 'categoria-4',
      icono: 'ci-lock',
      titulo_variedad: 'Pulgadas',
      variedades: [
        {
          titulo: '20 pulgadas',
          id: 'p20',
        },
        {
          titulo: '30 pulgadas',
          id: 'p30',
        },
        {
          titulo: '40 pulgadas',
          id: 'p40',
        },
      ],
      ruta: '../assets/img/ecommerce/cart/04.png',

      galeria: [
        {
          ruta: '../assets/img/ecommerce/cart/04.png',
        },
        {
          ruta: '../assets/img/ecommerce/cart/04.png',
        },
        {
          ruta: '../assets/img/ecommerce/cart/04.png',
        },
        {
          ruta: '../assets/img/ecommerce/cart/04.png',
        },
      ],
    };
    localStorage.setItem('categorias', JSON.stringify(categorias));
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('detalleProducto', JSON.stringify(detalleProducto));
  }
}
