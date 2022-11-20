import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../components/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests: number = 0;

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
