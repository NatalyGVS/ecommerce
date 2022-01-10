import { CarritoService } from './../../services/carrito.service';
import { UserService } from './../../services/user.service';
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
    private _configuracionService: ConfiguracionService,
    private _userService: UserService,
    private _carritoService: CarritoService
  ) {
    this.user_ls = this._userService.getUsuario();
    this.data_carrito_compras = this._carritoService.getCarrito();
    console.log('this.user_ls', this.user_ls);
    console.log('this.data_carrito_compras', this.data_carrito_compras);

    this.calcularCarrito();
  }

  ngOnInit(): void {
    //llenado de categorias
    this._configuracionService.getCategorias().subscribe((response) => {
      this.categorias = response;
    });
  }
  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

  open_modal_cart() {
    this.data_carrito_compras = this._carritoService.getCarrito(); //prox quitar

    console.log('this.data_carrito_compras', this.data_carrito_compras);
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
  calcularCarrito() {
    this.subtotal = 0;

    this.subtotal = this.data_carrito_compras.reduce((acc, px) => {
      return px.precio + acc;
    }, 0);
    console.log('this.subtotal', this.subtotal);
  }

  eliminarItem(id) {
    this.data_carrito_compras = this._carritoService.getCarrito(); //prox quitar

    this._carritoService
      .eliminarItemCarrito(this.data_carrito_compras, id)
      .subscribe((response) => {
        this.data_carrito_compras = response;

        this.calcularCarrito();
        console.log('neivo carrito', response);
      });
  }

  //reemplazar ngclass
  pintarNavSelected(id) {
    $('.nav.nav-category > .nav-item').removeClass('active-parent');
    $('#' + id)
      .parent()
      .addClass('active-parent');
    console.log('selectsdddd', $('#' + id));
  }

  refrescarPantalla(id) {
    this._router.navigate(['/categoria/', id]).then(() => {
      window.location.reload();
      // setTimeout(() => {
      this.pintarNavSelected(id);
      // }, 2000);
    });
  }
  openModalLocal() {
    console.log('abrir modal');
    $('#modalLocales').modal('show');
  }
}
