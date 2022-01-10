import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public user: any = {};
  public fieldTextType;
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public user_data: any = {};
  constructor(
    private _UserService: UserService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.fieldTextType = false;
    this.buildForm();
    if (localStorage.getItem('user_data')) this._router.navigate(['/']);
  }
  private buildForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  toggleTypePass() {
    let actual = this.fieldTextType;
    this.fieldTextType = !actual;
  }

  onResetForm(): void {
    this.userForm.reset();
  }

  onSaveForm(): void {
    if (this.userForm.valid) {
      const value = this.userForm.value;
      console.log('form validooo', value);
      this.login();
      // this.onResetForm();
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  ngOnInit(): void {}

  login() {
    //servicio de login
    this._router.navigate(['/']);

    this.user_data = {
      nombres: 'Nataly',
      apellidos: 'Vasquez Saenz',
      nick: 'Nataly',
      email: 'nataly.vasquez9718@gmail.com',
      dni: '75715222',
      genero: 'femenino',
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
  }
}
