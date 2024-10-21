import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitter } from 'src/app/emitter/emitter';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated = false;
  resule?: any;
  massage?: string;
  role?: string;
  uid?: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    Emitter.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getItem();
  }

  getItem(){
    this.http.get('http://localhost:3000/user/getUser', {
      withCredentials: true
    }).subscribe((res: any) => {
      this.massage = `Hi ${res.username}..`;
      this.resule = `${res.image}`;
      this.role = `${res.role}`;    
      this.uid = `${res._id}`;
 
      Emitter.authEmitter.emit(true)

    },
      err => {
        this.massage = "Who Are You";
        Emitter.authEmitter.emit(false)
      }
    )
  }  

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('data');

  //   Swal.fire('Logout success!', 'welcome!!', 'success').then(() => {
  //     this.router.navigate(['/login']);
  //     setTimeout(() => {
  //       location.reload();
  //     }, 10);
  //   });
  // }

  logout(): void {
    console.log('logout');
    //localStorage.removeItem('token');
    //localStorage.removeItem('data');    
    this.http.post<any>('http://localhost:3000/signout/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        console.log(this.authenticated);
        setTimeout(() => {
          location.reload();
        }, 10);

      },
        (error) => {
          console.error('Error during logout:', error);
        }
      )

  }
}