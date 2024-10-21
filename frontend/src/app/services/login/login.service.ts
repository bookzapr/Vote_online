import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  user:any
  login(userdata: any){
    console.log("service login succ")
    return this.http.post<any>('http://localhost:3000/login/signin' ,userdata,{withCredentials:true})
    .pipe(map(data =>{
      return data;
    }))
  }
  

}