import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tienda';

  ngOnInit(): void {
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

    localStorage.setItem('detalleProducto', JSON.stringify(detalleProducto));
  }
}
