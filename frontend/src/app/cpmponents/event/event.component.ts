import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnChanges{

  constructor( private http:HttpClient , private router:ActivatedRoute) {
    this.onLoading();
  } 
  
  results: any[] = [];
  results2: any=[];
  test: any=[];
  i :any; 
  event_id : any;


  ngOnInit(): void {
    this.showEventBy();
    this.refreshData();
    this.event_id = this.router.snapshot.params['id'];
  }
  ngOnChanges(): void {
    console.log("onchang");
    
}
  onLoading(){
    try{
      this.getCandidates().subscribe(
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
  
  getCandidates(){
    return this.http.get<any>('http://localhost:3000/editevent/getOnlyEvent/'+this.router.snapshot.params['id'])
      .pipe(map(data => {
        if(data){
          this.results = data;          
        }
        return this.results;
      }));
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

  deleteCandidate(id:any) {
    this.http.delete<any>('http://localhost:3000/candidate/deleteCandidate/'+id).subscribe(data => {
      this.deleteCandidateJEvent(data)
      Swal.fire('delete', 'successfully','warning')
    })
  }

  deleteCandidateJEvent(data:string) {
    this.http.delete('http://localhost:3000/editevent/deleteEventAcandidate/'+data).subscribe(data => {
      Swal.fire('delete', 'successfully','warning')
    })

    window.location.reload();
    
  }

  


}
