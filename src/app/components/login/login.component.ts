import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any = {};
  public user_data: any = {};
  constructor(private _UserService: UserService, private _router: Router) {
    //if esta logueado

    if (localStorage.getItem('user_data')) this._router.navigate(['/']);
  }

  ngOnInit(): void {}

  login(loginForm) {
    if (loginForm.valid) {
      console.log('form valido', this.user);

      let data = {
        email: this.user.email,
        password: this.user.pasword,
      };

      //servicio de login
      this._router.navigate(['/']);

      this.user_data = {
        nombres: 'Nataly',
        apellidos: 'Vasquez Saenz',
        nick: 'Nataly',
        email: 'nataly.vasquez9718@gmail.com',
        dni: '75715222',
        celular: '97999999',
        direcciones: [
          {
            id: 1,
            cliente: '75715222',
            destinatario: 'Duvan Saenz',
            dni: '7777777',
            zip: '005',
            direccion: 'Jr Argentina 201',
            telefono: '97999999',
            pais: 'Perú',
            distrito: 'Comas',
            provincia: 'Lima ',
            region: 'Lima',
            principal: true,
          },
        ],
        compras: [
          {
            id: 'C-001',
            destinatario: 'Fulanito Ramos',
            total: 5000,
            fechaEnvio: '10/10/2021',

            detalleCompra: [
              { id: 'px1', precio: 50, cantidad: 4 },
              { id: 'px2', precio: 70, cantidad: 2 },
            ],
          },
        ],
      };

      //Pasarle nombre de usuario al nav
      localStorage.setItem('user_data', JSON.stringify(this.user_data));
    } else {
      console.log('form invalido');
    }
  }
}
