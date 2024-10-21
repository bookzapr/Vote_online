import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  user:any
  results : any=[]=[];
  constructor(private http: HttpClient,private router:ActivatedRoute) { }

  updateUser(userdata: any,userId: string){
    return this.http.put<any>('http://localhost:3000/user/editUser/'+userId,userdata)
      .pipe(map(data => {       
        return data;
      }));
  }
}
