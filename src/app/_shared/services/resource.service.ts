
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {

  private readonly url = environment.url + this.getResourceUrl();

  constructor(protected httpClient: HttpClient) { }

  abstract getResourceUrl(): string;

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }

  get(id?: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`)
      .pipe(
        map((json) => this.fromServerModel(json))
      );
  }

  add(resource: T): Observable<any> {
    return this.httpClient.post(`${this.url}`, this.toServerModel(resource));
  }

  delete(id: string | number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  update(resource: T) {
    return this.httpClient.put(`${this.url}`, this.toServerModel(resource));
  }
}
