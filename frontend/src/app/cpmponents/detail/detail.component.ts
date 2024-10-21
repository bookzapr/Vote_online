import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { Emitter } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  events: any = [
    {"id":"1","e_title":"เลือกประธาน นร.","e_status":"open"},
    {"id":"2","e_title":"คัดเลือกหัวหน้าห้อง","e_status":"close"},
    {"id":"3","e_title":"คัดเลือก....","e_status":"close"},
    {"id":"4","e_title":"คัดเลือก....","e_status":"close"},
  ]

  candidates: any = [
    {"id":"1","c_id":"1001","c_img":"https://th-images.hellomagazine.com/wp-content/uploads/2021/12/21192602/b134-500x500.jpg",
    "c_name":"นาย A","c_intro":"สวัสดีครับ", "score":"7"},
 
  ]

  results: any=[];
  results2: any=[];
  checkUser: any=[];


  test: any=[];
  i :any;

  
  constructor( private http:HttpClient , private router:ActivatedRoute) {}
  massage= 'wellcome to home page'
  massage2 =''
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
    this.showEventBy();
    this.refreshData();
    this.testcheck();
    
  }

  refreshData(){

    this.http.get<any>('http://localhost:3000/editevent/getOnlyEvent/'+this.router.snapshot.params['id']).subscribe(data => {
      this.test = data;
      for ( this.i =0 ; this.i <this.test.length ;this.i++) {
        this.results[this.i] = this.test[this.i].EventACandidate;
      }
      this.test = this.results;
    })
  }

  showEventBy() {
    this.http.get<any>('http://localhost:3000/manageEvent/getEventBy2/'+this.router.snapshot.params['id']).subscribe(data2 => {
      this.results2 = data2[0];
    })

  }

  testcheck() {
    this.http.get<any>('http://localhost:3000/userJcandidate/test/'+this.router.snapshot.params['id']+'/'+this.router.snapshot.params['event_id']).subscribe(data2 => {
      this.checkUser = data2[0];
    })

  }

}
