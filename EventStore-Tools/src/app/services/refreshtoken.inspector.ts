import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injector, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

@Injectable()
  export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const auth = this.injector.get(AuthService);
      let req = request;
      if (auth.isLoggedIn()) {
        req = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + auth.getToken())
        });
      }

      return next.handle(req).do(
        () => {console.log('all right');},
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.log('logout');
            if (error.status === 401) {
              auth.logout();
              this.router.navigate(['login']);
            }
          }
        });
    }
}