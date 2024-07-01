// src/app/signup/signup.component.ts
import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup ,FormBuilder,Validators  } from '@angular/forms';
import {AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { debounceTime,catchError , map, switchMap, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

  signupForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder,private ApiService : ApiService , private router: Router ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email],[this.emailExistsValidator()] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }
  

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return this.ApiService.checkEmailExists(email).pipe(
        map(exists => {
          console.log('Email exists check for', email, ':', exists); // Add this line
          return exists ? { emailExists: true } : null;
        }),
        catchError(() => {
          console.log('Email check error'); // Add this line
          return of(null);
        })
      );
    };
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  signup() {
    if (this.signupForm.invalid) {
      console.log('Form is invalid');
      return;
    };

    const userData = this.signupForm.value;
    delete userData.confirmPassword;

    this.ApiService.addUser(userData)
      .subscribe(
        (response: any) => {
          console.log('Sign-up successful', response);
          // Optionally reset the form after successful submission
          this.resetForm();
        },
        (error) => {
          console.error('Error during sign-up', error);
        }
      );

  }

  resetForm() {
    this.signupForm.reset();
    this.router.navigate(['/']);
  }

}
