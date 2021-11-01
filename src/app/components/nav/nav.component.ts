import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public user_ls: any = undefined;
  public configuracion_categorias: any[];

  constructor(private _router: Router) {
    if (localStorage.getItem('user_data')) {
      this.user_ls = JSON.parse(localStorage.getItem('user_data'));
    } else {
      this.user_ls = undefined;
    }
    this.configuracion_categorias = JSON.parse(
      localStorage.getItem('categorias')
    );
  }

  ngOnInit(): void {}
  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }
}
