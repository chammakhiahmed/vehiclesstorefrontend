import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.apiService.checkEmailExists(email).subscribe(exists => {
      if (exists) {
        this.apiService.getUserByEmail(email).subscribe(user => {
          if (user.password === password) {
            // Open session and redirect to home page
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Incorrect password. Please try again.';
          }
        });
      } else {
        this.errorMessage = 'Email not found. Please sign up.';
      }
    });
  }
}
