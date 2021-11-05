import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login_cliente(data): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_cliente', data, {
      headers: headers,
    });
  }

  get_envios():Observable<any>{
    return this._http.get('./assets/envios.json');
  }
}
