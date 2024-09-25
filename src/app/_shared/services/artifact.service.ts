import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Artifact } from '../interfaces/artifact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { HelpersService } from './helpers.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private _helpersService = inject(HelpersService);
  private _dateService = inject(DateService);

  list = signal<Artifact[]>(new Array<Artifact>());

  artifacts = computed(() => {

    let artifactList = this.list().filter(artifact => artifact.class.toLowerCase() == 'generic').concat(this.list().filter(artifact => artifact.class.toLowerCase() == this.filterByClass().toLowerCase()));

    return artifactList.filter(artifact => artifact.name.toLowerCase().includes(this.filterByName().toLowerCase()));

  });
  filterByName = signal<string>('');
  filterByClass = signal<string>('');

  constructor(private _httpClient: HttpClient) {
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
    let fromStorage = localStorage.getItem('e7OrganizerArtifactsList');
    this.list.set(fromStorage && fromStorage.length > 0 ? JSON.parse(fromStorage) : []);

    const canUpdate = this._dateService.canUpdate(this.list().length);
    if (!canUpdate) {
      return;
    }

    this._httpClient.post('/api/artifacts', {}, this._headers(currentPage))
      .pipe(map(response => <{ artifactList: Array<{ artifactCode: string, artifactName: string, jobCode: string }> }>response))
      .pipe(
        map(response => {
          let artifacts: Artifact[] = [];
          for (const heroKey in response.artifactList) {
            if (Object.prototype.hasOwnProperty.call(response.artifactList, heroKey)) {
              let artifact = response.artifactList[heroKey];
              artifact.jobCode = this._helpersService.changeClassName(artifact.jobCode);
              artifacts.push({
                code: artifact.artifactCode,
                name: artifact.artifactName,
                level: -1,
                class: artifact.jobCode,
              } as Artifact)
            }
          }
          this.list.set(artifacts);
          this._dateService.lastUpdate.set(new Date());
          localStorage.setItem('e7OrganizerLastUpdate', JSON.stringify(this._dateService.lastUpdate()));
        })
      ).subscribe();
  }
}
