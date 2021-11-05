import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(
    private _http: HttpClient
  ) { }
  get_regiones(): Observable<any>{
    return this._http.get('./assets/regiones.json');
  }
  get_distritos(): Observable<any>{
    return this._http.get('./assets/distritos.json');
  }
  get_provincias(): Observable<any>{
    return this._http.get('./assets/provincias.json');
  }
}
