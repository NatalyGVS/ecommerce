import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css'],
})
export class DetallePedidoComponent implements OnInit {
  public load_data = true;
  public pedido: any = {};
  public detallesPedido: any[] = [];
  public id;
  constructor(private _route: ActivatedRoute) {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.pedido = JSON.parse(localStorage.getItem('user_data')).ventas.find(
      (pedido) => {
        return pedido.nVenta == this.id;
      }
    );
    if (this.pedido != undefined) {
      console.log('this.pedido', this.pedido);
      this.detallesPedido = this.pedido.detalles;
      this.load_data = false;
    } else {
      this.pedido = undefined;
      this.detallesPedido = undefined;
      this.load_data = false;
    }
  }

  ngOnInit(): void {}
}
