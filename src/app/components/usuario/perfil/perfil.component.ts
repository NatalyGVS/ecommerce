import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public cliente: any = {};

  constructor() {
    if (localStorage.getItem('user_data')) {
      this.cliente = JSON.parse(localStorage.getItem('user_data'));
    } else {
      this.cliente = {};
    }

    console.log('cliente', this.cliente);
  }
  ngOnInit(): void {}

  actualizar(actualizarForm) {
    if (actualizarForm.valid) {
      console.log('form valido', this.cliente);
      //metodo actualizar formulario
    } else {
      console.log('form INNNvalido');
    }
  }
}
