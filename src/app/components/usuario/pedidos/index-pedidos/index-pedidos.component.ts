import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-pedidos',
  templateUrl: './index-pedidos.component.html',
  styleUrls: ['./index-pedidos.component.css'],
})
export class IndexPedidosComponent implements OnInit {
  public load_data = true;
  public pedidos: any[] = [];
  public detallePedido : any[] = [];
  //paginacion
  public page = 1;
  public pageSize = 5; // productos por pagina
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    setTimeout(() => {
      //servicio obtener pedidos del cliente
      this.pedidos = this._userService.getPedidos();
      console.log('this.pedidos', this.pedidos);
      this.load_data = false;
    }, 2000);
  }
}
