import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ver-tiendas',
  templateUrl: './ver-tiendas.component.html',
  styleUrls: ['./ver-tiendas.component.css'],
})
export class VerTiendasComponent implements OnInit {
  @Input() product: any;

  constructor() {}

  ngOnInit(): void {}
}
