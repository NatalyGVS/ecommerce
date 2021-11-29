import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultar-stock',
  templateUrl: './consultar-stock.component.html',
  styleUrls: ['./consultar-stock.component.css'],
})
export class ConsultarStockComponent implements OnInit {
  @Input() product: any;
  constructor() {}

  ngOnInit(): void {}
}
