import { ConfiguracionService } from './../../../services/configuracion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-categorias',
  templateUrl: './index-categorias.component.html',
  styleUrls: ['./index-categorias.component.css'],
})
export class IndexCategoriasComponent implements OnInit {
  public principal: any = {};

  public route_principal;
  public load_data;
  constructor(
    private _route: ActivatedRoute,
    private _configuracionService: ConfiguracionService
  ) {
    this.load_data = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.route_principal = params['id'];
      this.principal = this._configuracionService
        .getCategorias()
        .subscribe((response) => {
          console.log('response total', response);
          this.principal = response.find((item) => {
            return item.id == this.route_principal;
          });
          console.log('response principal', this.principal);
          this.load_data = false;
        });
    });
    //llenado de categorias
  }
}
