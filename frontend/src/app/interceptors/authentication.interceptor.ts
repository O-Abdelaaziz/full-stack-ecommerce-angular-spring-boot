import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private oktaAuthService:OktaAuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request:HttpRequest<any>, next: HttpHandler):Promise<HttpEvent<any>> {
    
    const secureEndpoints=['http://localhost:8080/api/orders'];

    if(secureEndpoints.some(url=>request.urlWithParams.includes(url))){

      const accessToken = await this.oktaAuthService.getAccessToken();
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${accessToken}`,
          'Set-Cookie':'SameSite=strict'
        }
      });
    }

    return next.handle(request).toPromise();
  }
}
