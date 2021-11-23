import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  public principal;
  public producto;
  constructor(private _http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this._http.get('./assets/categorias.json');
  }
  /*
  getPrincipal(idPrincipal): any {
    this._http.get('./assets/categorias.json').subscribe((response) => {
      this.principal = response.find((item) => {
        return item.id == idPrincipal;
      });
      return this.principal;
    });
  }*/

  getProductos(): Observable<any> {
    return this._http.get('./assets/productos.json');
  }

  getProductosInicio(): Observable<any> {
    return this._http.get('./assets/productos_inicio.json');
  }
  /*
  getProducto(idProducto) {
    this._http.get('./assets/productos.json').subscribe((response: []) => {
      console.log('responseeeee', response);
     return  this.producto = response.find((item: any) => {
        return item.id == idProducto;
      });
    });
  }*/
}
