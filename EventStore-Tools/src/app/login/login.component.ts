import {Component } from '@angular/core';
import {AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})

export class Login {

    constructor(private authService : AuthService, private router:Router){}
    hide = true;
    userLogin: string = '';
    password: string = '';
    isAuth: boolean = false;

    login(){
        this.authService.login(this.userLogin, this.password)
            .subscribe(
                res=>{
                    if(res== true)
                    {
                        this.authService.setLogginIn(true);
                        this.router.navigate(['home']);
                    }
                }
            );
                
    }
}