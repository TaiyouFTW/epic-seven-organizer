import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject, signal, computed, effect } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { Hero } from "../interfaces/hero";
import { HelpersService } from "./helpers.service";
import { DateService } from "./date.service";


@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private _helpersService = inject(HelpersService);
  private _dateService = inject(DateService);

  list = signal<Hero[]>(new Array<Hero>());
  heroes = computed(() => this.list().filter(hero => hero.name.toLowerCase().includes(this.filterByName().toLowerCase())));
  filterByName = signal<string>('');

  constructor(private _httpClient: HttpClient) {
    effect(() => {
      localStorage.setItem('e7OrganizerHeroesList', JSON.stringify(this.list()));
    });
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

  async getAll(currentPage: number = 0) {
    let fromStorage = localStorage.getItem('e7OrganizerHeroesList');
    this.list.set(fromStorage && fromStorage.length > 0 ? JSON.parse(fromStorage) : []);

    const canUpdate = this._dateService.canUpdate(this.list().length);
    if (!canUpdate) {
      return;
    }

    let url = environment.production ? '/api/heroes' : '/guide/catalyst/getHeroFirstSet';

    this._httpClient.post(url, {}, this._headers(currentPage))
      .pipe(map(response => <{ heroList: Array<{ attributeCd: string, heroNm: string, heroCd: string, jobCd: string, grade: number }> }>response))
      .pipe(
        map(response => {
          let heroes: Hero[] = [];
          for (const heroKey in response.heroList) {
            if (Object.prototype.hasOwnProperty.call(response.heroList, heroKey)) {
              let hero = response.heroList[heroKey];
              hero.attributeCd = this._helpersService.changeElementName(hero.attributeCd);
              hero.jobCd = this._helpersService.changeClassName(hero.jobCd);
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
          this.list.set(heroes);
          this._dateService.lastUpdate.set(new Date());
          localStorage.setItem('e7OrganizerLastUpdate', JSON.stringify(this._dateService.lastUpdate()));
        })
      ).subscribe();
  }

}
