import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
})
export class OfertaComponent implements OnInit {
  public tiempoLimite: Date | string;
  constructor() {
    this.tiempoLimite = new Date('2021-12-28');
  }

  ngOnInit(): void {}
}
