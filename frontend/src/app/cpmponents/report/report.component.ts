import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { map } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{

  candidates: any = [   
  
  ]

  results: any=[];
  // results2: any=[];
  score: any=[];



  test: any=[];
  i :any;

  
  constructor( private http:HttpClient , private router:ActivatedRoute) {
    this.onLoading();
  }

  ngOnInit(): void {
    // this.showEventBy();
    this.refreshData();
    this.refreshData2();
    
  }
  onLoading(){
    try{
      this.getCandidatescount().subscribe(
        data => {
          this.results = data;
          console.log(this.results = data);
          
        },
        err => {
          console.log(err);
        }
      );
    }catch(err){
      console.log(err);
    }
  }
  getCandidatescount(){
    return this.http.get<any>('http://localhost:3000/userJcandidate/countScore/'+this.router.snapshot.params['id'])
      .pipe(map(data => {
        if(data){
          this.results = data;
        }
        return this.results;
      }));
  }

  refreshData(){

    this.http.get<any>('http://localhost:3000/userJcandidate/countScore/'+this.router.snapshot.params['id']).subscribe(data => {
      this.test = data;
      console.log(this.test[0].resultnew[0][0].id)
    })
  }

  // showEventBy() {
  //   this.http.get<any>('http://localhost:3000/manageEvent/getEventBy2/'+this.router.snapshot.params['id']).subscribe(data2 => {
  //     this.results2 = data2[0];
  //   })

  // }

  refreshData2(){

    this.http.get<any>('http://localhost:3000/userJcandidate/countScore/'+this.router.snapshot.params['id']).subscribe(data => {
      
    this.score = data;

  })

}


}

