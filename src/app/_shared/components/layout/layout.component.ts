import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ConfigService } from '../../services/config.service';

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

  constructor(private renderer: Renderer2, private configService: ConfigService) {
    this.changeTheme(this.configService.currentThemePreferenceValue);
    this.getScreenWidth = window.innerWidth;
    this.sidenavOver = this.getScreenWidth < 1065;
  }

  ngOnInit(): void {
  }

  changeTheme(theme: string) {
    this.colorTheme = theme;
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.colorTheme);
    this.configService.themePreferences(this.colorTheme);
  }
}
