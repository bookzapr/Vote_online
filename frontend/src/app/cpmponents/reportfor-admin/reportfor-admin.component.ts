import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-reportfor-admin',
  templateUrl: './reportfor-admin.component.html',
  styleUrls: ['./reportfor-admin.component.css']
})
export class ReportforAdminComponent implements OnInit {

  constructor( private http:HttpClient , private router:ActivatedRoute) {}
  
  results: any=[];

  resultlll: any=[];

  results2: any=[];
  test: any=[];
  i :any;


  ngOnInit(): void {
    this.showEventBy()
    this.refreshData();

  }

  showEventBy() {
    this.http.get<any>('http://localhost:3000/manageEvent/getEventBy2/'+this.router.snapshot.params['id']).subscribe(data2 => {
      this.results2 = data2[0];
    })

  }
  refreshData(){
    this.http.get<any>('http://localhost:3000/userJcandidate/countScore/'+this.router.snapshot.params['id']).subscribe(data => {
      this.test = data;
      console.log(this.test[0].resultnew[0][0].id)
    })
  }


}