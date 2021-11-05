import { Component, OnInit } from '@angular/core';
import { DireccionService } from 'src/app/services/direccion.service';
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
  public load_data = true;// false: ya cargo , true: sigue cargando

  constructor(private _direccionService: DireccionService) {
    this.direccionesCliente = JSON.parse(
      localStorage.getItem('user_data')
    ).direcciones;
    console.log('this.direccionesCliente', this.direccionesCliente);
    this.load_data = false;
  }
  ngOnInit(): void {
    this.load_data = false;
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
      data.cliente = JSON.parse(localStorage.getItem('user_data')).dni;
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
      //notificacion : Se agrego la nueva direccion correctamente

      let direccionesTotales = JSON.parse(
        localStorage.getItem('user_data')
      ).direcciones;

      if (this.direccion.principal == true) {
        direccionesTotales.forEach((element) => {
          element.principal = false;
        });
      }
      //establecer id:
      let valorMaximo = direccionesTotales.reduce((prev, item) => {
        return Math.max(prev, item.id);
      }, -100);

      console.log('valor_maximo', valorMaximo);
      data.id = valorMaximo + 1;

      //Agregar direccion
      direccionesTotales.push(data);
      let user = JSON.parse(localStorage.getItem('user_data'));
      user.direcciones = direccionesTotales;
      localStorage.setItem('user_data', JSON.stringify(user));

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
    } else {
      // NOTIFICACION IZITOAST
    }
  }
  establecer_principal(id) {
    let direccionesTotales = JSON.parse(
      localStorage.getItem('user_data')
    ).direcciones;
    direccionesTotales.forEach((elemento) => {
      elemento.principal = false;

      if (elemento.id == id) {
        elemento.principal = true;
      }
    });
    let user = JSON.parse(localStorage.getItem('user_data'));
    user.direcciones = direccionesTotales;
    this.direccionesCliente = direccionesTotales;
    localStorage.setItem('user_data', JSON.stringify(user));
  }
}
