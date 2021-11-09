import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  constructor(private _http: HttpClient) {}

  get_categorias(): Observable<any> {
    return this._http.get('./assets/categorias.json');
  }

  get_productos(): Observable<any> {
    return this._http.get('./assets/productos.json');
  }


}
