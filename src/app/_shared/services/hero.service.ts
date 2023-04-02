import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../interfaces/hero';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesSubject: BehaviorSubject<Hero[]>;
  public heroes$: Observable<Hero[]>;

  private myHeroesSubject: BehaviorSubject<Hero[]>;
  public myHeroes$: Observable<Hero[]>;

  private lastUpdate: Date = new Date();

  constructor(
    private httpClient: HttpClient,
    private helpersService: HelpersService
  ) {
    this.heroesSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('e7OrganizerHeroesList')!));
    this.heroes$ = this.heroesSubject.asObservable();

    this.myHeroesSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('e7OrganizerMyHeroes')!));
    this.myHeroes$ = this.myHeroesSubject.asObservable();

    let lastUpdateAux = localStorage.getItem('e7OrganizerLastUpdate');
    if (lastUpdateAux != null) {
      this.lastUpdate = new Date(JSON.parse(lastUpdateAux));
    }
  }

  public get heroesValue() {
    return this.heroesSubject.value;
  }

  public get myHeroesValue() {
    return this.myHeroesSubject.value;
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
    let lastUpdateNextThursday = new Date(this.lastUpdate.setDate(this.lastUpdate.getDate() + (4 - this.lastUpdate.getDay() + 7) % 7 + 7));

    today.setUTCHours(0, 0, 0, 0);
    lastUpdateNextThursday.setUTCHours(0, 0, 0, 0);

    if (today.getTime() < lastUpdateNextThursday.getTime() && today.getDay() != 2 && this.heroesValue) {
      return this.heroes$;
    }

    let url = '/guide/catalyst/getHeroFirstSet';
    if (environment.production) {
      url = '/api/heroes';
    }

    return this.httpClient.post(url, {}, this._headers(currentPage))
      .pipe(map(response => <{ heroList: Array<{ attributeCd: string, heroNm: string, heroCd: string, jobCd: string, grade: number }> }>response))
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
                grade: hero.grade,
                skills: null,
                awakening: null,
                imprint: null,
                tree: null,
                priority: null
              } as Hero)
            }
          }
          this.heroesSubject.next(heroes);
          this.lastUpdate = new Date();
          localStorage.setItem('e7OrganizerLastUpdate', JSON.stringify(this.lastUpdate));
          localStorage.setItem('e7OrganizerHeroesList', JSON.stringify(heroes));
          return heroes;
        })
      );
  }

  add(hero: Hero) {
    let heroes = this.myHeroesValue;

    if (heroes != null && heroes.length > 0) {
      let index = heroes.findIndex(x => x.id == hero.id);
      if (index != -1) {
        heroes[index] = hero;
      } else {
        hero.priority = heroes.length;
        heroes.push({ ...hero });
      }
    } else {
      heroes = [];
      heroes.push({ ...hero });
    }
    localStorage.setItem('e7OrganizerMyHeroes', JSON.stringify(heroes));
    this.myHeroesSubject.next(heroes);
  }

  delete(heroId: string) {
    let heroes = this.myHeroesValue;
    if (heroes != null && heroes.length > 0) {
      let index = heroes.findIndex(x => x.id == heroId);
      if (index != -1) {
        heroes.splice(index, 1);
        localStorage.setItem('e7OrganizerMyHeroes', JSON.stringify(heroes));
        this.myHeroesSubject.next(heroes);
      }
    }
  }

  updateHeroPool(heroes: Hero[]) {
    localStorage.setItem('e7OrganizerMyHeroes', JSON.stringify(heroes));
    this.myHeroesSubject.next(heroes);
  }
}
