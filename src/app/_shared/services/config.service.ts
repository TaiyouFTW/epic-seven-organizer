import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _currentThemePreferenceSubject: BehaviorSubject<string>;
  public currentThemePreference: Observable<string>;

  private _currentCanUpdateSubject: BehaviorSubject<boolean>;
  public currentCanUpdate: Observable<boolean>;

  constructor() {
    // theme preferences
    let getCurrentThemePreference = localStorage.getItem('eo_themePreference');
    let parsedCurrentThemePreference = JSON.parse(getCurrentThemePreference!);
    this._currentThemePreferenceSubject = new BehaviorSubject<string>(parsedCurrentThemePreference);
    this.currentThemePreference = this._currentThemePreferenceSubject.asObservable();

    // can update data
    let getCurrentCanUpdate = localStorage.getItem('eo_canUpdate');
    let parsedCurrentCanUpdate = JSON.parse(getCurrentCanUpdate!);
    this._currentCanUpdateSubject = new BehaviorSubject<boolean>(parsedCurrentCanUpdate);
    this.currentCanUpdate = this._currentCanUpdateSubject.asObservable();
  }

  public get currentThemePreferenceValue(): string {
    return this._currentThemePreferenceSubject.value;
  }

  public get currentCanUpdateValue(): boolean {
    return this._currentCanUpdateSubject.value == null ? true : this._currentCanUpdateSubject.value;
  }

  themePreferences(themeColor: string) {
    localStorage.setItem('eo_themePreference', JSON.stringify(themeColor));
    this._currentThemePreferenceSubject.next(themeColor);
  }

  canUpdate(canUpdate: boolean = true) {
    localStorage.setItem('eo_canUpdate', JSON.stringify(canUpdate));
    this._currentCanUpdateSubject.next(canUpdate);
  }
}
