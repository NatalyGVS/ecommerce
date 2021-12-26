import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
})
export class DiscountComponent implements OnInit {
  public tiempoLimite: Date | string;
  constructor() {
    this.tiempoLimite = new Date('2021-12-28');
  }

  ngOnInit(): void {}
}
