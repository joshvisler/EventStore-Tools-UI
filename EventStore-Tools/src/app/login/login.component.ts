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
                (data: boolean) => 
                {
                    this.isAuth = data

                    if(this.isAuth == true)
                    {
                        console.info(this.isAuth);
                        this.router.navigate(['register']);
                    }
                },
                error => console.log(error)
            );
    }
}