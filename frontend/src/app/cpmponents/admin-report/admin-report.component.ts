import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})

export class AdminReportComponent implements OnInit{

  constructor( private http:HttpClient) {}

  results: any=[];

  ngOnInit(){
    this.http.get<any>('http://localhost:3000/dashboard/testGet').subscribe(data => {
      this.results = data;
    })
  }

}
