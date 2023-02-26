import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private httpClient: HttpClient,
    private helpersService: HelpersService
  ) { }

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
    return this.httpClient.post('/guide/catalyst/getHeroFirstSet', {}, this._headers(currentPage))
      .pipe(map(response => <{ heroList: Array<{ attributeCd: string, heroNm: string, heroCd: string, jobCd: string }> }>response))
      .pipe(
        map(response => {
          let heroes: Hero[] = [];
          for (const heroKey in response.heroList) {
            if (Object.prototype.hasOwnProperty.call(response.heroList, heroKey)) {
              let hero = response.heroList[heroKey];
              hero.attributeCd = this.helpersService.changeElementName(hero.attributeCd);
              hero.jobCd = this.helpersService.changeElementName(hero.jobCd);
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
          return heroes;
        })
      );
  }
}
