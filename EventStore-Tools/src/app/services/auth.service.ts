import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Configuration } from '../app.constants';
import { BehaviorSubject } from 'rxjs';
import { AuthResult } from '../models/auth.result.model';
import { Observable } from 'rxjs/Observable';
import { ValidationErrors } from '@angular/forms';
import { User } from '../models/user.model';

@Injectable()
export class AuthService{
    
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    private loggedIn = false;

    constructor(private http: HttpClient, private _configuration: Configuration){ 
        this.loggedIn = !!localStorage.getItem('auth_token');
        this.baseApiAddres = _configuration.ServerWithApiUrl + '/auth';
    }
    private baseApiAddres : string;

    register(login: string, password:string):Observable<boolean>{
        let body = JSON.stringify({login: login, password:password});
        return this.http.post<boolean>(this.baseApiAddres + '/signin', body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .map(res => true)
    }

    login(login: string, password:string):Observable<boolean>{
        let body = JSON.stringify({login: login, password:password});
        return this.http.post<AuthResult>(this.baseApiAddres + '/login', body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
        .map(res => 
            {
                localStorage.setItem('auth_token', res.token);
                this.loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
      }
    
      isLoggedIn() {
        console.info(this.loggedIn);
        return this.loggedIn;
      }
}