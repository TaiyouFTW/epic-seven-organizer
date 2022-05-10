import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artifact, CompleteListedArtifact, ListedArtifact } from '../interfaces/artifact';
import { ConfigService } from './config.service';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private _currentArtifactSubject: BehaviorSubject<ListedArtifact>;
  public currentArtifact: Observable<ListedArtifact>;

  constructor(private httpClient: HttpClient, private helpersService: HelpersService, private configService: ConfigService) {
    let getCurrentArtifact = localStorage.getItem('eo_currentArtifact');
    let parsedCurrentArtifact = JSON.parse(getCurrentArtifact!);

    this._currentArtifactSubject = new BehaviorSubject<ListedArtifact>(parsedCurrentArtifact);
    this.currentArtifact = this._currentArtifactSubject.asObservable();
  }

  public get currentArtifactValue(): ListedArtifact {
    return this._currentArtifactSubject.value;
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
        'gc_artifact': 'ef320'
      })
    };

    return httpOptions;
  }

  artifacts(currentPage: number = 0) {
    if (this.currentArtifactValue == null || this.helpersService.canUpdate()) {
      if (environment.production) {
        return this._fromProduction();
      } else {
        return this._fromDevelopment(currentPage);
      }
    } else {
      return this._currentArtifactSubject;
    }
  }

  private _fromDevelopment(currentPage: number) {
    return this.httpClient.post<CompleteListedArtifact>('/guide/wearingStatus/getArtifactList', {}, this.headers(currentPage))
      .pipe(
        map(response => {
          let artifact: Artifact[] = [];
          response.artifactList.forEach(element => {
            artifact.push({
              code: element.artifactCode,
              name: element.artifactName,
              grade: element.grade,
              jobCode: this.helpersService.fixJobClasses(element.jobCode),
            });
          });

          let listedArtifact: ListedArtifact = {
            totalCount: response.totalCount,
            currentPage: response.currentPage,
            artifacts: artifact
          };

          localStorage.setItem('eo_currentArtifact', JSON.stringify(listedArtifact));
          this._currentArtifactSubject.next(listedArtifact);

          return listedArtifact;
        })
      );
  }

  private _fromProduction() {
    return this.httpClient.get<CompleteListedArtifact>('https://gist.githubusercontent.com/TaiyouFTW/83df5e72a89c0541a05af1b611ace976/raw/4ec8beb2e8e9fa230ae7b2b94a1be81d95c402bd/getArtifactList.json', {})
      .pipe(
        map(response => {
          let artifact: Artifact[] = [];
          response.artifactList.forEach(element => {
            artifact.push({
              code: element.artifactCode,
              name: element.artifactName,
              grade: element.grade,
              jobCode: this.helpersService.fixJobClasses(element.jobCode),
            });
          });

          let listedArtifact: ListedArtifact = {
            totalCount: response.totalCount,
            currentPage: response.currentPage,
            artifacts: artifact
          };

          localStorage.setItem('eo_currentArtifact', JSON.stringify(listedArtifact));
          this._currentArtifactSubject.next(listedArtifact);

          return listedArtifact;
        })
      );
  }
}
