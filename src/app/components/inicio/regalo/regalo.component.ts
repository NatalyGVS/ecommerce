import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-regalo',
  templateUrl: './regalo.component.html',
  styleUrls: ['./regalo.component.css'],
})
export class RegaloComponent implements OnInit {
  @Input() precio: string;
  @Input() contenido: string;

  constructor() {}

  ngOnInit(): void {}
}
