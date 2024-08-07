// src/app/signup/signup.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, catchError, map, switchMap, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { formatDate } from '@angular/common';
 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;
  passwordFieldType: string = 'password';
  date: Date = new Date();


  constructor(private fb: FormBuilder, private UserService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
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
      let test = false;
      return this.UserService.checkEmailExists(email).pipe(
        map(exists => {
          console.log('Email exists check for', email, ':', exists); // Add this line
          // return exists ? { emailExists: true } : null;
          console.log("this return :", exists.find((res: any) => { res.email === email }))
          exists.map((res: any) => {
            if (res[0].email === email) { test = true; }
          });

          return test ? { emailExists: true } : null;
        }),
        catchError(() => {
          console.log('Email check error'); 
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
    userData.role = 'client';
    userData.createdAt = formatDate(this.date,'yyyy-MM-dd','en-US')


    this.UserService.addUser(userData)
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
    this.router.navigate(['/login']);
  }

}
