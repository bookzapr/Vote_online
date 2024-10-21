import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor( private http:HttpClient) {}

  results: any=[];
  countEvent : any=[];
  countMember : any=[];
  countCandidate : any=[];

  ngOnInit(){
    this.http.get<any>('http://localhost:3000/dashboard/testGet').subscribe(data => {
      this.results = data;
    })

    this.http.get<any>('http://localhost:3000/dashboard/getCountEvent').subscribe(data => {
      this.countEvent = data;
    })
    this.http.get<any>('http://localhost:3000/user/getCountMember').subscribe(data => {
      this.countMember = data;
    })
    this.http.get<any>('http://localhost:3000/candidate/getCountCandidate').subscribe(data => {
      this.countCandidate = data;
    })
      
  }
  
  

}
