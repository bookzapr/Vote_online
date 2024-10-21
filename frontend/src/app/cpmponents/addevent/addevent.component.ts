import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit{
  addEventForm = new FormGroup({
    title2: new FormControl('', [Validators.required]),
    detail: new FormControl(''),
    status: new FormControl(''),
    start: new FormControl('', [Validators.required]),
    end2: new FormControl('', [Validators.required]),
  })
  constructor( private http:HttpClient) {}

  title: string ="";
  describe:string="";
  open: Date = new Date();
  end: Date = new Date();
  status: string = "" ;




  get title2() { return this.addEventForm.get('title2'); }


  get start() { return this.addEventForm.get('start'); }

  get end2() { return this.addEventForm.get('end2'); } 


  addEvent() 
  {
    let bodyData = {
     "title" : this.title,
     "describe" : this.describe,
     "status": this.status,
     "open": this.open,
     "end": this.end
    };

    console.log(bodyData)

    this.http.post("http://localhost:3000/manageEvent/addEvent",bodyData,{responseType:'text'}).subscribe(data => {
      alert("Create Event Success!");

      this.title = "";
      this.describe = "";
      this.status = "" ;
      
    })
  }



  ngOnInit(): void {
    
  }
}
