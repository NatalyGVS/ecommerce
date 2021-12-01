import { Component, OnInit } from '@angular/core';
import { DireccionService } from 'src/app/services/direccion.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any; //importar jquery

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css'],
})
export class DireccionesComponent implements OnInit {
  public direccion: any = {
    pais: '',
    region: '',
    provincia: '',
    distrito: '',
    principal: false,
  };

  public direccionesCliente: Array<any> = [];
  public regiones: Array<any> = [];
  public provincias: Array<any> = [];
  public distritos: Array<any> = [];

  public regiones_completas: Array<any> = [];
  public provincias_completas: Array<any> = [];
  public distritos_completas: Array<any> = [];

  //precargador
  public load_data = true; // false: ya cargo , true: sigue cargando

  constructor(
    private _direccionService: DireccionService,
    private _userService: UserService
  ) {
    this.direccionesCliente = this._userService.getDirecciones(null);
    this.load_data = false;
  }
  ngOnInit(): void {
    this._direccionService.get_regiones().subscribe((response) => {
      this.regiones_completas = response;
    });
    this._direccionService.get_provincias().subscribe((response) => {
      this.provincias_completas = response;
    });
    this._direccionService.get_distritos().subscribe((response) => {
      this.distritos_completas = response;
    });
  }

  select_pais() {
    if (this.direccion.pais == 'Perú') {
      $('#sl-region').prop('disabled', false);
      this._direccionService.get_regiones().subscribe((response) => {
        response.forEach((element) => {
          this.regiones.push({
            id: element.id,
            name: element.name,
          });
        });
      });
    } else {
      $('#sl-region').prop('disabled', true);
      $('#sl-provincia').prop('disabled', true);
      this.regiones = [];
      this.provincias = [];
      this.direccion.region = '';
      this.direccion.provincia = '';
    }
  }

  select_region() {
    this.provincias = [];
    $('#sl-provincia').prop('disabled', false);
    $('#sl-distrito').prop('disabled', true);
    this.direccion.provincia = '';
    this.direccion.distrito = '';

    this._direccionService.get_provincias().subscribe((response) => {
      response.forEach((element) => {
        if (element.department_id == this.direccion.region) {
          this.provincias.push({
            element,
          });
        }
      });
    });
  }
  select_provincia() {
    this.distritos = [];
    $('#sl-distrito').prop('disabled', false);
    this.direccion.distrito = '';

    this._direccionService.get_distritos().subscribe((response) => {
      response.forEach((element) => {
        if (element.province_id == this.direccion.provincia) {
          this.distritos.push({
            element,
          });
        }
      });
      console.log('this.distritos', this.distritos);
    });
  }

  registrar(registroForm) {
    if (registroForm.valid) {
      let data = this.direccion;
      data.region = this.regiones_completas.find(
        (element) => parseInt(element.id) == parseInt(this.direccion.region)
      ).name;
      data.provincia = this.provincias_completas.find(
        (element) => parseInt(element.id) == parseInt(this.direccion.provincia)
      ).name;
      data.distrito = this.distritos_completas.find(
        (element) => parseInt(element.id) == parseInt(this.direccion.distrito)
      ).name;

      console.log('data', data);
      //llamar al servicio
      this._userService.addDireccion(null, data);

      //notificacion : Se agrego la nueva direccion correctamente

      this.direccion = {
        pais: '',
        region: '',
        provincia: '',
        distrito: '',
        principal: false,
      };
      $('#sl-region').prop('disabled', false);
      $('#sl-provincia').prop('disabled', false);
      $('#sl-distrito').prop('disabled', false);

      //refrecar tabla de direcciones
      this.direccionesCliente = this._userService.getDirecciones(null);
    } else {
      // NOTIFICACION IZITOAST
      console.log('form invalido');
    }
  }
  establecer_principal(id) {

    this.direccionesCliente = this._userService.establecerDireccionPrincipal(null, id);

  }
}
