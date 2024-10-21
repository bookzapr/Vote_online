import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private http: HttpClient, private lg: LoginService, private router: Router) { }
  ngOnInit(): void {
  }
  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  submit(): void {    
    if (this.loginForm.valid) {
      this.lg.login(this.loginForm.value).subscribe(        
        data => {
          if (data.status === true) {          
          Swal.fire('Login success!', 'welcome!!', 'success').then(() => {
            this.router.navigate(['main']).then(() => {
              location.reload();
            });
            setTimeout(() => {
              location.reload();
            }, 10);
          });   

        }else {
          // Handle failed login
          Swal.fire('Login Fail!', 'welcome!!', 'warning').then(() => {
            this.router.navigate(['/login']);
            setTimeout(() => {
              location.reload();
            }, 10);
          }); 
        }
          
  
        },
      
        err => {
          
          console.log(err);
        }
      )
    }
  }

 
}