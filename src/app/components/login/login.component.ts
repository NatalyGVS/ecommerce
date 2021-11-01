import { ClienteService } from './../../services/cliente.service';
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
  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ) {
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
      };

      //Pasarle nombre de usuario al nav
      localStorage.setItem('user_data', JSON.stringify(this.user_data));
    } else {
      console.log('form invalido');
    }
  }
}
