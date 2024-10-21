import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitter } from 'src/app/emitter/emitter';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  massage?: string
  constructor(private http: HttpClient,private router: Router) { }
  ngOnInit(): void {
    this.http.get('http://localhost:3000/user/getUser',{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.massage = `Hi ${res.username} id: ${res.id} role: ${res.role}`;
      Emitter.authEmitter.emit(true)
      
    },
    err =>{
      this.massage = "you are not login";
      Emitter.authEmitter.emit(false)
    }
    )
  }

}
