import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CompleteListedHero, Hero, ListedHero } from '../interfaces/hero';
import { HelpersService } from './helpers.service';

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
      return this.httpClient.post<CompleteListedHero>('/guide/wearingStatus/getHeroList', {}, this.headers(currentPage))
        .pipe(
          map(response => {
            let heroes: Hero[] = [];
            response.heroList.forEach(element => {
              heroes.push({
                code: element.heroCode,
                name: element.heroName,
                grade: element.grade,
                jobCode: this.helpersService.fixJobClasses(element.jobCode),
                attributeCode: this.helpersService.fixElements(element.attributeCode),
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
    } else {
      return this._currentHeroesSubject;
    }
  }

  // getResourceUrl(): string {
  //   return 'portrait';
  // }

  // playableCharacters(): Observable<Heroz[]> {
  //   return this.httpClient.get<Raw>(this.fileUrl)
  //     .pipe(
  //       map(response => {
  //         let heroes: Heroz[] = [];
  //         for (let tag in response.heroes) {
  //           if (tag.indexOf('c') === 0 && tag.length < 6) {
  //             if (blacklist.indexOf(tag) === -1) {
  //               let rawHero = response.raw.find((e: { name: string; }) => e.name == response.heroes[tag]);
  //               heroes.push({
  //                 id: tag,
  //                 name: response.heroes[tag],
  //                 image: `https://www.e7vau.lt/static/game/face/${tag}_s.png`,
  //                 rarity: rawHero ? rawHero.rarity : 0,
  //                 element: rawHero ? rawHero.element.toLowerCase() : '',
  //                 role: rawHero ? rawHero.class.replace(" ", "-").toLowerCase() : '',
  //                 // element: rawHero ? `${this.imageAssets}/element/${rawHero.element.toLowerCase()}.png` : '',
  //                 // role: rawHero ? `${this.imageAssets}/class/${rawHero.class.replace(" ", "-").toLowerCase()}.png` : '',
  //               });
  //             }
  //           }
  //         }
  //         return heroes;
  //       })
  //     );
  // }

  // unknown(): Observable<Heroz> {
  //   return this.httpClient.get<any>(this.fileUrl)
  //     .pipe(
  //       map(response => {
  //         let hero: Heroz = {} as Heroz;
  //         for (let tag in response.heroes) {
  //           if (tag.indexOf('c4141') === 0) {
  //             hero = {
  //               id: tag,
  //               name: response[tag],
  //               image: `https://www.e7vau.lt/static/game/face/${tag}_s.png?`,
  //             };
  //           }
  //         }
  //         return hero;
  //       })
  //     );
  // }
}
