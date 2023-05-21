import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  token: string = "";
  constructor(private _storageService: StorageService) {
    this.token = _storageService.getUserToken();
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
      headers: req.headers.set('Authorization', `Bearer ${this.token}`)
    });
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server response')

            console.log(JSON.stringify(event))
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log('Server response');
            console.log(JSON.stringify(err));
            alert(err.status + '; ' + err.statusText + '; ' + err.error['message']);
          }
        }
      )
    )
  }
}

