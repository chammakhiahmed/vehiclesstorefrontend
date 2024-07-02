import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

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
    private UserService: UserService,
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

    this.UserService.checkEmailExists(email).subscribe(exists => {
      if (exists) {
        console.log("part 1 ",exists)
        this.UserService.getUserByEmail(email).subscribe(users => {
          console.log("part 2 ",users)
          users.map((user:any)=>{
          if (user[0].password === password)
             {
              console.log("part 3 ",user[0].password, password)

            localStorage.setItem('roleUser', JSON.stringify(user[0].role));
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Incorrect password. Please try again.';
          }})
        });
      } else {
        this.errorMessage = 'Email not found. Please sign up.';
      }
    });
  }
 

}
