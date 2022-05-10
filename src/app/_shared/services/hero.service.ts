import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CompleteListedHero, Hero, ListedHero } from '../interfaces/hero';
import { HelpersService } from './helpers.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private _currentHeroesSubject: BehaviorSubject<ListedHero>;
  public currentHeroes: Observable<ListedHero>;

  constructor(private httpClient: HttpClient, private helpersService: HelpersService) {
    let getCurrentHeroes = localStorage.getItem('eo_currentHeroes');
    let parsedCurrentHeroes = JSON.parse(getCurrentHeroes!);

    this._currentHeroesSubject = new BehaviorSubject<ListedHero>(parsedCurrentHeroes);
    this.currentHeroes = this._currentHeroesSubject.asObservable();
  }

  public get currentHeroesValue(): ListedHero {
    return this._currentHeroesSubject.value;
  }

  private headers(currentPage: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'gc_currentPage': currentPage.toString(),
        'gc_isPaging': 'N',
        'gc_lang': 'en',
        'gc_world': 'world_global',
        'gc_hero': 'c4071'
      })
    };

    return httpOptions;
  }

  heroes(currentPage: number = 0) {
    if (this.currentHeroesValue == null || this.helpersService.canUpdate()) {
      if (environment.production) {
        return this._fromProduction();
      } else {
        return this._fromDevelopment(currentPage);
      }
    } else {
      return this._currentHeroesSubject;
    }
  }

  private _fromDevelopment(currentPage: number) {
    return this.httpClient.post<CompleteListedHero>('/guide/catalyst/getHeroFirstSet', {}, this.headers(currentPage))
      .pipe(
        map(response => {
          let heroes: Hero[] = [];
          response.heroList.forEach(element => {
            heroes.push({
              code: element.heroCd,
              name: element.heroNm,
              grade: element.grade,
              jobCode: this.helpersService.fixJobClasses(element.jobCd),
              attributeCode: this.helpersService.fixElements(element.attributeCd)
            });
          });

          let listedHeroes: ListedHero = {
            totalCount: response.totalCount,
            currentPage: response.currentPage,
            heroes: heroes
          };

          localStorage.setItem('eo_currentHeroes', JSON.stringify(listedHeroes));
          this._currentHeroesSubject.next(listedHeroes);

          return listedHeroes;
        })
      );
  }

  private _fromProduction() {
    return this.httpClient.get<CompleteListedHero>('https://gist.githubusercontent.com/TaiyouFTW/41fb7c29a336dee60596c3d8fc2585cb/raw/c1b21c60943001ef485a7b1e558253030d74d127/getHeroFirstSet.json', {})
      .pipe(
        map(response => {
          let heroes: Hero[] = [];
          response.heroList.forEach(element => {
            heroes.push({
              code: element.heroCd,
              name: element.heroNm,
              grade: element.grade,
              jobCode: this.helpersService.fixJobClasses(element.jobCd),
              attributeCode: this.helpersService.fixElements(element.attributeCd)
            });
          });

          let listedHeroes: ListedHero = {
            totalCount: response.totalCount,
            currentPage: response.currentPage,
            heroes: heroes
          };

          localStorage.setItem('eo_currentHeroes', JSON.stringify(listedHeroes));
          this._currentHeroesSubject.next(listedHeroes);

          return listedHeroes;
        })
      );
  }
}
