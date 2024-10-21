import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddcandidatesService {
  candidate:any;
  constructor(private http: HttpClient,private router:ActivatedRoute) { }
  CreateCandi(userdata: any){
    console.log("service user create")
    return this.http.post<any>('http://localhost:3000/candidate/addCandidate' ,userdata)
    .pipe(map(data =>{
      return data;
    }))
  };
  updateCandi(userdata: any,userId: string){
    return this.http.put<any>("http://localhost:3000/candidate/editCandidate/"+userId,userdata)
      .pipe(map(data => {       
        return data;
      }));
  }
}
