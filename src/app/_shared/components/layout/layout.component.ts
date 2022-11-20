import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  colorTheme: string = 'light';

  getScreenWidth: number;
  sidenavOver: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.sidenavOver = this.getScreenWidth < 1065;
  }

  constructor() {
    this.getScreenWidth = window.innerWidth;
    this.sidenavOver = this.getScreenWidth < 1065;
  }

  ngOnInit(): void {
  }
}
