import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  public contacto: any = {};
  public load_btn = false;
  constructor() {}

  ngOnInit(): void {}

  registro(registroForm) {
    if (registroForm.valid) {
      this.load_btn = true;
      //servicio post
      //se envio correctamente el mensaje.
      this.load_btn = false;
    } else {
    }
  }
}
