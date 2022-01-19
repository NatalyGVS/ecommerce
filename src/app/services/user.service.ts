import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url;
  public user;
  public pedidos = [
    {
      destinatario: 'Abarca Ramirez',
      detalles: [
        {
          id: 'px1',
          producto: 'Tijeras y Cuchillas',
          ruta: '../../assets/img/productos/amoladorasyEsmeriles.png',
          marca: 'Nombre Marca',
          precioUnitario: 50, //individual
          cantidad: 4,
        },
        {
          id: 'px2',
          producto: 'Set de herramientas',
          ruta: '../../assets/img/productos/atornilladores.jpg',
          precioUnitario: 70,
          cantidad: 2,
        },
        {
          id: 'px3',
          producto: 'Martillos y mazos',
          ruta: '../../assets/img/productos/cierraCircular.jpg',
          marca: 'Nombre Marca',
          precioUnitario: 70,
          cantidad: 1,
        },
      ],
      fechaEnvio: '11/01/2022',
      fechaCompra: '05/01/2022',
      id: 3,
      numPedido: 'C-003',
      estado: 'En progreso',
      metodoEnvio: 'Envio Gratis',
      precioEnvio: 20,
      subtotal: 280,
      total: 300, // envio + subtotal
      direccion: {
        destinatario: 'Pedrito Perez Rodriguez',
        direccion: 'Jr Argentina 201',
        pais: 'Perú',
        provincia: 'Lima',
        region: 'Lima',
        distrito: 'Comas',
      },
    },
    {
      destinatario: 'Fulanito Ramos',
      detalles: [
        {
          id: 'px1',
          producto: 'Tijeras y Cuchillas',
          ruta: '../../assets/img/productos/amoladorasyEsmeriles.png',
          precioUnitario: 50,
          cantidad: 4,
        },
        {
          id: 'px2',
          producto: 'Set de herramientas',
          ruta: '../../assets/img/productos/lijadoras.png',
          precioUnitario: 70,
          cantidad: 2,
        },
      ],
      fechaEnvio: '10/01/2021',
      fechaCompra: '05/01/2022',
      id: 2,
      numPedido: 'C-002',
      precioEnvio: 20,
      subtotal: 280,
      total: 300, // envio + subtotal
      estado: 'Enviado',
      metodoEnvio: 'Envio Gratis',
    },
    {
      destinatario: 'Maritza Perez',
      detalles: [
        {
          id: 'px1',
          producto: 'Taladros',
          ruta: '../../assets/img/productos/taladros.jpg',
          precioUnitario: 50,
          cantidad: 4,
        },
      ],
      fechaEnvio: '12/03/2021',
      fechaCompra: '23/02/2021',
      id: 1,
      numPedido: 'C-001',
      precioEnvio: 20,
      subtotal: 80,
      total: 100, // envio + subtotal
      estado: 'Enviado',
      metodoEnvio: 'Envio Gratis',
    },
  ];
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getUsuario() {
    let user = JSON.parse(localStorage.getItem('user_data'));

    this.user = user != undefined ? user : null;
    return this.user;
  }

  getEnvios(): Observable<any> {
    return this._http.get('./assets/envios.json');
  }

  getDirecciones(idCliente) {
    return JSON.parse(localStorage.getItem('user_data')).direcciones;
  }
  addDireccion(idCliente, dataDireccion) {
    let data = dataDireccion;
    data.cliente = JSON.parse(localStorage.getItem('user_data')).dni;

    let direccionesTotales = JSON.parse(
      localStorage.getItem('user_data')
    ).direcciones;

    if (data.principal == true) {
      direccionesTotales.forEach((element) => {
        element.principal = false;
      });
    }
    //establecer id:
    let valorMaximo = direccionesTotales.reduce((prev, item) => {
      return Math.max(prev, item.id);
    }, -100);

    data.id = valorMaximo + 1;

    //Agregar direccion
    direccionesTotales.push(data);
    let user = JSON.parse(localStorage.getItem('user_data'));
    user.direcciones = direccionesTotales;
    localStorage.setItem('user_data', JSON.stringify(user));
  }
  establecerDireccionPrincipal(idCliente, idDireccionPrincipal) {
    let direccionesTotales = JSON.parse(
      localStorage.getItem('user_data')
    ).direcciones;
    direccionesTotales.forEach((elemento) => {
      elemento.principal = false;

      if (elemento.id == idDireccionPrincipal) {
        elemento.principal = true;
      }
    });
    let user = JSON.parse(localStorage.getItem('user_data'));
    user.direcciones = direccionesTotales;
    localStorage.setItem('user_data', JSON.stringify(user));

    return direccionesTotales;
  }

  getPedidos() {
    // return JSON.parse(localStorage.getItem('user_data')).compras;
    return this.pedidos;
  }
  getDetallePedido(id: any) {
    let detallePedido = this.pedidos.find((item) => (item.id = id));
    return detallePedido;
  }
}
