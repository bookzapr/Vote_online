import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {
  editEventForm = new FormGroup({
    title2: new FormControl('', [Validators.required]),
    detail: new FormControl(''),
    status: new FormControl(''),
    start: new FormControl('', [Validators.required]),
    end2: new FormControl('', [Validators.required]),
  })
  constructor( private http:HttpClient , private router:ActivatedRoute) {}

  title: any  ;
  describe:any ;
  open: Date = new Date();
  end: Date = new Date();
  status!: string  ;




  get title2() { return this.editEventForm.get('title2'); }


  get start() { return this.editEventForm.get('start'); }

  get end2() { return this.editEventForm.get('end2'); }

  results: any=[];
  

  ngOnInit(): void {
    this.showEventBy()
  }
 

  editEvent() 
  {
    let bodyData = {
     "title" : this.title,
     "describe" : this.describe,
     "status": this.status,
     "open": this.open,
     "end": this.end
    };

    

    this.http.put("http://localhost:3000/editevent/editEvent/"+this.router.snapshot.params['id'],bodyData,{responseType:'text'}).subscribe(data => {
      Swal.fire('Upadte update', 'successfully','success')

      this.title = "";
      this.describe = "";
      this.status = "" ;
      
    })
  }

  showEventBy() {
    this.http.get<any>('http://localhost:3000/manageEvent/getEventBy/'+this.router.snapshot.params['id']).subscribe(data => {
      this.results = data;
    })

    
  }


  

  

  
}
