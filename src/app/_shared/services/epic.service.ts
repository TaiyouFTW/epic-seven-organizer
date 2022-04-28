import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ListedArtifact, Artifact, CompleteListedArtifact } from '../interfaces/artifact';
import { ListedHero, Hero, CompleteListedHero } from '../interfaces/hero';
import { ListedCatalyst, Catalyst, CompleteListedCatalyst } from '../interfaces/catalyst';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  private _currentHeroesSubject: BehaviorSubject<ListedHero>;
  public currentHeroes: Observable<ListedHero>;

  constructor(private httpClient: HttpClient, private helpersService: HelpersService) {
    let getCurrentHeroes = localStorage.getItem('currentHeroes');
    let parsedCurrentHeroes = JSON.parse(getCurrentHeroes!);
    this._currentHeroesSubject = new BehaviorSubject<ListedHero>(parsedCurrentHeroes);
    this.currentHeroes = this._currentHeroesSubject.asObservable();
  }

  public get currentHeroesValue(): ListedHero {
    return this._currentHeroesSubject.value;
  }

  headers(currentPage: number) {
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

  // artifacts(currentPage: number = 0) {
  //   return this.httpClient.post<CompleteListedArtifact>('/guide/wearingStatus/getArtifactList', {}, this.headers(currentPage))
  //     .pipe(
  //       map(response => {
  //         let artifacts: Artifact[] = [];
  //         response.artifactList.forEach(element => {
  //           artifacts.push({
  //             artifactCode: element.artifactCode,
  //             artifactName: element.artifactName,
  //             jobCode: element.jobCode,
  //             grade: element.grade
  //           });
  //         });

  //         let listedArtifacts: ListedArtifact = {
  //           totalCount: response.totalCount,
  //           currentPage: response.currentPage,
  //           artifacts: artifacts
  //         };

  //         return listedArtifacts;
  //       })
  //     );
  // }

  // heroes(currentPage: number = 0) {
  //   return this.httpClient.post<CompleteListedHero>('/guide/wearingStatus/getHeroList', {}, this.headers(currentPage))
  //     .pipe(
  //       map(response => {
  //         let heroes: Hero[] = [];
  //         response.heroList.forEach(element => {
  //           heroes.push({
  //             code: element.heroCode,
  //             name: element.heroName,
  //             grade: element.grade,
  //             jobCode: this.helpersService.fixJobClasses(element.jobCode),
  //             attributeCode: this.helpersService.fixElements(element.attributeCode),
  //           });
  //         });

  //         let listedHeroes: ListedHero = {
  //           totalCount: response.totalCount,
  //           currentPage: response.currentPage,
  //           heroes: heroes
  //         };

  //         localStorage.setItem('currentHeroes', JSON.stringify(listedHeroes));
  //         this._currentHeroesSubject.next(listedHeroes);

  //         return listedHeroes;
  //       })
  //     );
  // }

  catalysts(currentPage: number = 0) {
    return this.httpClient.post<CompleteListedCatalyst>('/guide/catalyst/getCatalystList', {}, this.headers(currentPage))
      .pipe(
        map(response => {
          // useType 1 == awakening and skill enhance
          // useType 2 == awakening
          // useType 3 == skill enhance

          let catalysts: Catalyst[] = [];
          response.catalystList.forEach(element => {
            catalysts.push({
              catalystCode: element.catalystCode,
              catalystName: element.catalystName,
              useType: element.useType
            });
          });

          let listedCatalysts: ListedCatalyst = {
            totalCount: response.totalCount,
            currentPage: response.currentPage,
            catalysts: catalysts
          };
          return listedCatalysts;
        })
      );
  }
}
