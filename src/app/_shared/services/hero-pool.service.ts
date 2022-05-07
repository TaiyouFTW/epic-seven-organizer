import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BuildHero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroPoolService {

  private _currentHeroPoolSubject: BehaviorSubject<BuildHero[]>;
  public currentHeroPool: Observable<BuildHero[]>;

  constructor() {
    let getCurrentHeroPool = localStorage.getItem('eo_currentHeroPool');
    let parsedCurrentHeroPool = JSON.parse(getCurrentHeroPool!);

    this._currentHeroPoolSubject = new BehaviorSubject<BuildHero[]>(parsedCurrentHeroPool);
    this.currentHeroPool = this._currentHeroPoolSubject.asObservable();
  }

  public get currentHeroPoolValue(): BuildHero[] {
    return this._currentHeroPoolSubject.value;
  }

  public set currentHeroPoolValue(value: BuildHero[]) {
    this._currentHeroPoolSubject.next(value);
    localStorage.setItem('eo_currentHeroPool', JSON.stringify(value));
  }
}
