import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _currentThemePreferenceSubject: BehaviorSubject<string>;
  public currentThemePreference: Observable<string>;

  private _currentCanUpdateByDateSubject: BehaviorSubject<Date>;
  public currentCanUpdateByDate: Observable<Date>;


  constructor() {
    // theme preferences
    let getCurrentThemePreference = localStorage.getItem('eo_themePreference');
    let parsedCurrentThemePreference = JSON.parse(getCurrentThemePreference!);
    this._currentThemePreferenceSubject = new BehaviorSubject<string>(parsedCurrentThemePreference);
    this.currentThemePreference = this._currentThemePreferenceSubject.asObservable();

    // can date
    let getCurrentCanUpdateByDate = localStorage.getItem('eo_canUpdateByDate');
    let parsedCurrentCanUpdateByDate = JSON.parse(getCurrentCanUpdateByDate!);
    this._currentCanUpdateByDateSubject = new BehaviorSubject<Date>(parsedCurrentCanUpdateByDate);
    this.currentCanUpdateByDate = this._currentCanUpdateByDateSubject.asObservable();
  }

  public get currentThemePreferenceValue(): string {
    return this._currentThemePreferenceSubject.value == null || this._currentThemePreferenceSubject.value == undefined || this._currentThemePreferenceSubject.value == '' ? 'light' : this._currentThemePreferenceSubject.value;
  }

  public get currentCanUpdateByDateValue(): Date {
    return this._currentCanUpdateByDateSubject.value == null || this._currentCanUpdateByDateSubject.value == undefined ? new Date() : this._currentCanUpdateByDateSubject.value;
  }

  themePreferences(themeColor: string) {
    localStorage.setItem('eo_themePreference', JSON.stringify(themeColor));
    this._currentThemePreferenceSubject.next(themeColor);
  }

  canUpdateByDate() {
    localStorage.setItem('eo_canUpdateByDate', JSON.stringify(new Date()));
    this._currentCanUpdateByDateSubject.next(new Date());
  }
}
