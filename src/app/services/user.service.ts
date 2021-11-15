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
  
}
