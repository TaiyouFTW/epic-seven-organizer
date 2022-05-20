import { Component, OnInit, Renderer2 } from '@angular/core';
import { ConfigService } from '../_shared/services/config.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  colorTheme: string = 'light';

  constructor(private renderer: Renderer2, private configService: ConfigService) {
    this.changeTheme(this.configService.currentThemePreferenceValue);
  }

  ngOnInit(): void {
  }

  changeTheme(theme: string) {
    this.colorTheme = theme;
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.colorTheme);
    this.configService.themePreferences(this.colorTheme);
  }
}
