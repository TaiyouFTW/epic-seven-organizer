import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Artifact } from '../interfaces/artifact';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

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
        'gc_artifact': 'ef320'
      })
    };

    return httpOptions;
  }

  getAll(currentPage: number = 0) {
    return this.httpClient.post('/guide/wearingStatus/getArtifactList', {}, this._headers(currentPage))
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
                level: null,
                class: artifact.jobCode,
              } as Artifact)
            }
          }
          return artifacts;
        })
      );
  }
}
