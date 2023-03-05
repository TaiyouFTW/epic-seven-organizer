import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesSubject: BehaviorSubject<Hero[]>;
  public heroes$: Observable<Hero[]>;

  constructor(
    private httpClient: HttpClient,
    private helpersService: HelpersService
  ) {
    this.heroesSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('e7OrganizerHeroesList')!));
    this.heroes$ = this.heroesSubject.asObservable();
  }

  public get heroesValue() {
    return this.heroesSubject.value;
  }

  private _headers(currentPage: number) {
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

  getAll(currentPage: number = 0): Observable<Hero[]> {
    let today = new Date();
    if (today.getDay() != 4 && this.heroesValue) {
      return this.heroes$;
    }
    return this.httpClient.post('/guide/catalyst/getHeroFirstSet', {}, this._headers(currentPage))
      .pipe(map(response => <{ heroList: Array<{ attributeCd: string, heroNm: string, heroCd: string, jobCd: string }> }>response))
      .pipe(
        map(response => {
          let heroes: Hero[] = [];
          for (const heroKey in response.heroList) {
            if (Object.prototype.hasOwnProperty.call(response.heroList, heroKey)) {
              let hero = response.heroList[heroKey];
              hero.attributeCd = this.helpersService.changeElementName(hero.attributeCd);
              hero.jobCd = this.helpersService.changeClassName(hero.jobCd);
              heroes.push({
                id: null,
                name: hero.heroNm,
                level: null,
                artifact: null,
                status: null,
                tags: [],
                code: hero.heroCd,
                class: hero.jobCd,
                element: hero.attributeCd,
              } as Hero)
            }
          }
          localStorage.setItem('e7OrganizerHeroesList', JSON.stringify(heroes));
          this.heroesSubject.next(heroes);
          return heroes;
        })
      );
  }
}
