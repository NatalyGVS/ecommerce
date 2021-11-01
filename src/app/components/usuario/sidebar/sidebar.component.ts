import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public user_ls: any = undefined;

  constructor() {
    if (localStorage.getItem('user_data')) {
      this.user_ls = JSON.parse(localStorage.getItem('user_data'));
    } else {
      this.user_ls = undefined;
    }
  }

  ngOnInit(): void {}
}
