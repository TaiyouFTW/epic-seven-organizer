import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Example } from '../interfaces/example';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends ResourceService<Example> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'comments';
  }
}