import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _currentThemePreferenceSubject: BehaviorSubject<string>;
  public currentThemePreference: Observable<string>;

  constructor() {
    let getCurrentThemePreference = localStorage.getItem('eo_themePreference');
    let parsedCurrentThemePreference = JSON.parse(getCurrentThemePreference!);
    this._currentThemePreferenceSubject = new BehaviorSubject<string>(parsedCurrentThemePreference);
    this.currentThemePreference = this._currentThemePreferenceSubject.asObservable();
  }

  public get currentThemePreferenceValue(): string {
    return this._currentThemePreferenceSubject.value;
  }

  themePreferences(themeColor: string) {
    localStorage.setItem('eo_themePreference', JSON.stringify(themeColor));
    this._currentThemePreferenceSubject.next(themeColor);
  }
}
