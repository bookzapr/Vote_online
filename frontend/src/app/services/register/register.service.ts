import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user:any
  results: any=[];
  constructor(private http: HttpClient,private router:ActivatedRoute) { }

  CreateUser(userdata: any){
    console.log("service user create")
    return this.http.post<any>('http://localhost:3000/user/addUser' ,userdata,{withCredentials:true})
    .pipe(map(data =>{
      return data;
    }))
  }
  
}