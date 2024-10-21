import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { Emitter } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
    massage= 'wellcome to home page'
    massage2 =''
  events: any = [
    {"id":"1","e_title":"เลือกประธาน นร.","e_status":"open"},
    {"id":"2","e_title":"คัดเลือกหัวหน้าห้อง","e_status":"close"},
    {"id":"3","e_title":"คัดเลือก....","e_status":"close"},
    {"id":"4","e_title":"คัดเลือก....","e_status":"close"},
  ]

  results: any=[];

  results2: any=[];




  constructor( private http:HttpClient , private router:ActivatedRoute) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/user/getUser',{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.massage = `Hi ${res.username} id: ${res.id} role: ${res.role}`;
      this.massage2 = res.id;
      Emitter.authEmitter.emit(true)
      
    },
    err =>{
      this.massage = "you are not login";
      Emitter.authEmitter.emit(false)
    }
    )
    
    this.showEventBy()
    this.refreshData()      
    
    
  }
 
  showEventBy() {
    this.http.get<any>('http://localhost:3000/main/testGet/').subscribe(data2 => {
      this.results = data2;
    })

  }

  refreshData(){
    this.http.get<any>('http://localhost:3000/manageEvent/testGet').subscribe(data => {
      this.results2 = data;
      console.log(this.results2)
    })

  }

}
