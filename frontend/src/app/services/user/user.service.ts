import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:any
  results: any=[];
  constructor(private http: HttpClient,private router:ActivatedRoute) { }

  updatePassword(userdata: any){
    console.log(userdata);
    console.log("service user password update")
    return this.http.post<any>('http://localhost:3000/user/checkUserBy' , userdata)
    .pipe(map(data =>{
      return data;
    }))
  }
}
