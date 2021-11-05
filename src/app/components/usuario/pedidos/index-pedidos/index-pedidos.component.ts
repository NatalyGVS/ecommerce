import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-pedidos',
  templateUrl: './index-pedidos.component.html',
  styleUrls: ['./index-pedidos.component.css'],
})
export class IndexPedidosComponent implements OnInit {
  public load_data = true;
  public pedidos: any[] = [];

  //paginacion
  public page = 1;
  public pageSize = 2; // productos por pagina
  constructor() {}

  ngOnInit(): void {
    //servicio obtener pedidos del cliente
    this.pedidos = JSON.parse(localStorage.getItem('user_data')).ventas;
    console.log('this.pedidos', this.pedidos);
    this.load_data = false;
  }
}
