import {Component } from '@angular/core';
import {AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {FormControl, Validators, NG_VALIDATORS, FormGroup, FormBuilder, ValidationErrors} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [AuthService]
})

export class Register {
    hide = true;
    userForm: FormGroup;
    userExist:boolean;

    constructor(private fb: FormBuilder, private authService : AuthService, private router:Router){}
    
    ngOnInit() {
        this.userForm = this.fb.group({
            name: [null, [
              Validators.required,
              Validators.minLength(4)]
            ],
            password: [null, [
              Validators.required,
              Validators.minLength(4),
              this.passwordValidator]
            ]
          });
    }

    get name(){return this.userForm.get('name')}
    get password(){return this.userForm.get('password')}

    private passwordValidator(control: FormControl): ValidationErrors {
        const value = control.value;
        const hasNumber = /[0-9]/.test(value);
        const hasCapitalLetter = /[A-Z]/.test(value);
        const hasLowercaseLetter = /[a-z]/.test(value);
        const isLengthValid = value ? value.length >= 6 : false;

        if (!isLengthValid) {
            return { invalidPassword: 'Please enter at least 6 character' };
        }

        if (!hasNumber) {
            return { invalidPassword: 'Password must contain at least 1 digit characters' };
        }

        if (!hasCapitalLetter) {
            return { invalidPassword: 'Password must contain at least 1 uppercase characters'  };
        }

        if (!hasLowercaseLetter) {
            return { invalidPassword: 'Password must contain at least 1 lowercase characters'  };
        }
        return null;
    }

    register(){
        
        if(this.name.valid === false || this.password.valid === false)
            return;

        this.authService.register(this.name.value, this.password.value)
            .subscribe(
                (data: boolean) => 
                {
                    if(data == true)
                    {
                        this.router.navigate(['login']);
                    }
                },
                error => console.log(error)
            );
    }
}