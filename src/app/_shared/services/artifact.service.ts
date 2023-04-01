import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artifact } from '../interfaces/artifact';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private artifactsSubject: BehaviorSubject<Artifact[]>;
  public artifacts$: Observable<Artifact[]>;

  private lastUpdate: Date = new Date();

  constructor(
    private httpClient: HttpClient,
    private helpersService: HelpersService
  ) {
    this.artifactsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('e7OrganizerArtifactsList')!));
    this.artifacts$ = this.artifactsSubject.asObservable();

    let lastUpdateAux = localStorage.getItem('e7OrganizerLastUpdate');
    if (lastUpdateAux != null) {
      this.lastUpdate = new Date(JSON.parse(lastUpdateAux));
    }
  }

  public get artifactsValue() {
    return this.artifactsSubject.value;
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
        'gc_artifact': 'ef320'
      })
    };

    return httpOptions;
  }

  getAll(currentPage: number = 0) {
    let today = new Date();
    let lastUpdateNextThursday = new Date(this.lastUpdate.setDate(this.lastUpdate.getDate() + (4 - this.lastUpdate.getDay() + 7) % 7 + 7));

    today.setUTCHours(0, 0, 0, 0);
    lastUpdateNextThursday.setUTCHours(0, 0, 0, 0);

    if (today.getTime() < lastUpdateNextThursday.getTime() && today.getDay() != 4 && this.artifactsValue) {
      return this.artifacts$;
    }

    let url = '/guide/wearingStatus/getArtifactList';
    if (environment.production) {
      url = '/api/artifacts';
    }
    return this.httpClient.post(url, {}, this._headers(currentPage))
      .pipe(map(response => <{ artifactList: Array<{ artifactCode: string, artifactName: string, jobCode: string }> }>response))
      .pipe(
        map(response => {
          let artifacts: Artifact[] = [];
          for (const heroKey in response.artifactList) {
            if (Object.prototype.hasOwnProperty.call(response.artifactList, heroKey)) {
              let artifact = response.artifactList[heroKey];
              artifact.jobCode = this.helpersService.changeClassName(artifact.jobCode);
              artifacts.push({
                code: artifact.artifactCode,
                name: artifact.artifactName,
                level: -1,
                class: artifact.jobCode,
              } as Artifact)
            }
          }
          this.artifactsSubject.next(artifacts);
          this.lastUpdate = new Date();
          localStorage.setItem('e7OrganizerLastUpdate', JSON.stringify(this.lastUpdate));
          localStorage.setItem('e7OrganizerArtifactsList', JSON.stringify(artifacts));
          return artifacts;
        })
      );
  }
}
