import { ConfiguracionService } from './../../services/configuracion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public user_ls: any = undefined;
  public categorias: any[];

  public carrito_compras_cart = false;
  public data_carrito_compras: any[] = [];
  public subtotal = 0;

  constructor(
    private _router: Router,
    private _configuracionService: ConfiguracionService
  ) {
    if (localStorage.getItem('user_data')) {
      this.user_ls = JSON.parse(localStorage.getItem('user_data'));
    } else {
      this.user_ls = undefined;
    }

    if (localStorage.getItem('carrito_compras')) {
      this.data_carrito_compras = JSON.parse(
        localStorage.getItem('carrito_compras')
      );
    } else {
      this.data_carrito_compras = [];
    }
    this.calcular_carrito();
  }

  ngOnInit(): void {
    //llenado de categorias
    this._configuracionService.get_categorias().subscribe((response) => {
      this.categorias = response;
    });
  }
  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

  open_modal_cart() {
    this.data_carrito_compras = JSON.parse(
      localStorage.getItem('carrito_compras')
    );

    if (!this.carrito_compras_cart) {
      //si es false, mostrar
      this.carrito_compras_cart = true;
      $('#cart').addClass('show');
    } else {
      //si es true, ocultar
      this.carrito_compras_cart = false;
      $('#cart').removeClass('show');
    }
  }
  calcular_carrito() {
    this.subtotal = 0;

    if (localStorage.getItem('carrito_compras')) {
      this.subtotal = this.data_carrito_compras.reduce((acc, px) => {
        return px.precio + acc;
      }, 0);
      console.log('this.subtotal', this.subtotal);
    }
  }

  eliminar_item(id) {
    this.data_carrito_compras = JSON.parse(
      localStorage.getItem('carrito_compras')
    );

    this.data_carrito_compras = this.data_carrito_compras.filter(function (
      item
    ) {
      return item.id !== id;
    });

    localStorage.setItem(
      'carrito_compras',
      JSON.stringify(this.data_carrito_compras)
    );
    this.calcular_carrito();
    console.log('neivo carrito', this.data_carrito_compras);
  }

  pintarNavSelected(id) {
    $('.nav.nav-category > .nav-item').removeClass('active-parent');
    $('#' + id)
      .parent()
      .addClass('active-parent');
    console.log('selectsdddd', $('#' + id));
  }

  refrescarPantalla(id) {
    this._router.navigate(['/productos/categoria/', id]).then(() => {
      window.location.reload();
      // setTimeout(() => {
      this.pintarNavSelected(id);
      // }, 2000);
    });
  }
}
