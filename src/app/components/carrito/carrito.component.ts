import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
declare var Cleave;
declare var StickySidebar;
declare var paypal;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  @ViewChild('paypalButton', { static: true }) paypalElement: ElementRef;
  public user: any;
  public data_carrito_compras: any[] = [];
  public subtotal = 0;
  public total_pagar: any = 0;
  //card direcciones
  public direccion_principal: any = {};

  //card envios
  public envios: Array<any> = [];
  public precio_envio = '0';

  //proceso de venta
  public venta: any = {};
  public dventa: Array<any> = [];

  //datos de tarjeta
  public card_data: any = {};
  public btn_load = false;
  public carrito_load = true;

  constructor(
    private _UserService: UserService,
    private _router: Router,
    private _carritoService: CarritoService
  ) {
    this.venta.cliente = JSON.parse(localStorage.getItem('user_data')).dni;
    this.user = JSON.parse(localStorage.getItem('user_data'));

    this._UserService.getEnvios().subscribe((response) => {
      this.envios = response;
    });
  }
  init_data() {
    this.data_carrito_compras = this._carritoService.getCarrito();

    console.log(' this.data_carrito_compras', this.data_carrito_compras);

    this.calcularCarrito();
    this.calcular_total('Envío gratis');

    this.data_carrito_compras.forEach((element) => {
      console.log('element', element);
      this.dventa.push({
        producto: element.id,
        subtotal: element.precio,
        variedad: element.variedad,
        cantidad: element.cantidad,
        cliente: JSON.parse(localStorage.getItem('user_data')).dni,
      });
    });

    setTimeout(() => {
      this.carrito_load = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.init_data();
    setTimeout(() => {
      //LIBRERIAS EXTERNAS
      // formato de numero tarjeta de credito
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type) {
          // update UI ...
        },
      });
      // formato de mm/yy tarjeta de credito
      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'Y'],
      });
    });
    //sidebar estatico
    var sidebar = new StickySidebar('.sidebar-sticky', { topSpacing: 20 });
    // this.instanciar_paypal();
    this.obtener_direccion_principal();
  }
  /*
  instanciar_paypal() {
    //Inicializar paypal
    paypal
      .Buttons({
        style: {
          layout: 'horizontal',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Pago en Ferri',
                amount: {
                  currency_code: 'USD',
                  value: this.subtotal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const pedido = await actions.order.capture();
          this.venta.transaccion =
            pedido.purchase_units[0].payments.captures[0].id;

          this.registrar_venta();
        },
        onError: (err) => {
          console.log('error ordennnn', err);
        },
        onCancel: function (data, actions) {
          console.log('cancelada ordennnn', data, actions);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
*/
  registrar_venta() {
    this.venta.detalles = this.dventa;

    //Registrar venta en un servicio
    this.venta.nVenta = 'v001';
    this.venta.estado = 'Procesando';

    let user = JSON.parse(localStorage.getItem('user_data'));
    if (user.ventas) {
      user.ventas.push(this.venta);
    } else {
      user.ventas = [this.venta];
    }
    localStorage.setItem('user_data', JSON.stringify(user));
    //limpiar carrito de  compras
    let carrito: any = [];
    localStorage.setItem('carrito_compras', carrito);

    this._router.navigate(['/']);
  }

  calcularCarrito() {
    this.subtotal = this.data_carrito_compras.reduce((acc, px) => {
      return px.precio * px.cantidad + acc;
    }, 0);
    console.log('this.subtotal', this.subtotal);
    this.total_pagar = this.subtotal;
  }

  calcular_total(envio_titulo) {
    this.total_pagar =
      Number(this.subtotal.toString()) + Number(this.precio_envio);
    this.venta.subtotal = this.total_pagar;
    this.venta.envio_precio = Number(this.precio_envio);
    this.venta.envio_titulo = envio_titulo;

    console.log('thisventa', this.venta);
  }

  eliminarItem(id) {
    this.data_carrito_compras = this._carritoService.eliminarItemCarrito(
      this.data_carrito_compras,
      id
    );
    this.calcularCarrito();
  }

  obtener_direccion_principal() {
    let direcciones = JSON.parse(localStorage.getItem('user_data')).direcciones;
    this.direccion_principal = direcciones.find((item) => {
      return item.principal == true;
    });
    if (this.direccion_principal)
      this.venta.direccion = this.direccion_principal;
  }

  completar_pedido() {
    let mes, anio;
    let exp_arr = this.card_data.exp.toString().split('/');

    let data = {
      card_number: this.card_data.ncard
        .toString()
        .replace(/ /g, '')
        .toString()
        .substr(0, 16),
      cvv: this.card_data.cvc,
      expiration_month: exp_arr[0],
      expiration_year: exp_arr[1].toString().substr(0, 4),
      email: this.user.email,
    };

    console.log('dataa', data);
    this.btn_load = true;
    setTimeout(() => {
      this.btn_load = false;

      this.registrar_venta();
    }, 2000);
  }

  reduceProduct() {
    // if (this.dataCarrito.cantidad > 1) this.dataCarrito.cantidad--;
  }
  addProduct() {
    // this.dataCarrito.cantidad++;
    // this.validar_stock();
  }

  actualizarPrecio(item) {
    this.calcularCarrito();
    this.calcular_total('Envío gratis');
  }
}
