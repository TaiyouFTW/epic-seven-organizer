import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../components/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private _totalRequests: number = 0;
  loadingService = inject(LoadingService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._totalRequests++;
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this._totalRequests--;
        if (this._totalRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
