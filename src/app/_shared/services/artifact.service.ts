import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Artifact } from '../interfaces/artifact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private lastUpdate: Date = new Date();

  helpersService = inject(HelpersService);

  list = signal<Artifact[]>(new Array<Artifact>());

  artifacts = computed(() => {

    let artifactList = this.list().filter(artifact => artifact.class.toLowerCase() == 'generic').concat(this.list().filter(artifact => artifact.class.toLowerCase() == this.filterByClass().toLowerCase()));

    return artifactList.filter(artifact => artifact.name.toLowerCase().includes(this.filterByName().toLowerCase()));

  });
  filterByName = signal<string>('');
  filterByClass = signal<string>('');

  constructor(private httpClient: HttpClient) {
    let lastUpdateAux = localStorage.getItem('e7OrganizerLastUpdate');
    if (lastUpdateAux != null) {
      this.lastUpdate = new Date(JSON.parse(lastUpdateAux));
    }

    effect(() => {
      localStorage.setItem('e7OrganizerArtifactsList', JSON.stringify(this.list()));
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

    let fromStorage = localStorage.getItem('e7OrganizerArtifactsList');
    this.list.set(fromStorage && fromStorage.length > 0 ? JSON.parse(fromStorage) : []);

    if (today.getTime() < lastUpdateNextThursday.getTime() && today.getDay() != 4 && this.list().length > 0) {
      return;
    }

    let url = environment.production ? '/api/artifacts' : '/guide/wearingStatus/getArtifactList';

    this.httpClient.post(url, {}, this._headers(currentPage))
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
          this.list.set(artifacts);
          this.lastUpdate = new Date();
          localStorage.setItem('e7OrganizerLastUpdate', JSON.stringify(this.lastUpdate));
        })
      ).subscribe();
  }
}
