import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  colorTheme: string = 'light';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private renderer: Renderer2, private configService: ConfigService, private breakpointObserver: BreakpointObserver) {
    this.changeTheme(this.configService.currentThemePreferenceValue);
    console.log(this.isHandset$);
  }

  ngOnInit(): void {
  }

  changeTheme(theme: string) {
    this.colorTheme = theme;
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.colorTheme);
    this.configService.themePreferences(this.colorTheme);
  }
}
