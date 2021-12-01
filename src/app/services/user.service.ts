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
}
