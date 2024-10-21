import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { AddcandidatesService } from 'src/app/services/addcandidates/addcandidates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcandidates',
  templateUrl: './editcandidates.component.html',
  styleUrls: ['./editcandidates.component.css']
})
export class EditcandidatesComponent implements OnInit {
  editcandidatesForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    fastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    gender: new FormControl(''),
    intro: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),


  })
  constructor( private http:HttpClient , private router:ActivatedRoute, private ec: AddcandidatesService  ) {}

  

  
  get image() { return this.editcandidatesForm.get('image'); }

  get firstname() { return this.editcandidatesForm.get('firstname'); }

  get lastname() { return this.editcandidatesForm.get('lastname'); }

  get age() { return this.editcandidatesForm.get('age'); }

  get intro() { return this.editcandidatesForm.get('intro'); }
  get file() {
    return this.editcandidatesForm.get('file');
  }

  gender: string[] = ['Male', 'Female', 'Other']


  results: any=[];
  results2: any=[];

  

  ngOnInit(): void {
    this.showCandidateBy()
    this.showEventBy();    
  }
  showEventBy() {
    this.http.get<any>('http://localhost:3000/manageEvent/getEventBy2/'+this.router.snapshot.params['event_id']).subscribe(data2 => {
      this.results2 = data2[0];
    })

  }
  udateCandidate(){
    console.log(this.editcandidatesForm.value)
    console.log("valid status : "+this.editcandidatesForm.valid)
    if (this.editcandidatesForm.value) {
      console.log("user create")
      this.ec.updateCandi(this.editcandidatesForm.value,this.router.snapshot.params['id']).subscribe(
        data => {
          Swal.fire('Upadte update', 'successfully','success')         
          console.log("update user sucss")
          //this.editcandidatesForm.reset();         
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      alert('Cannot create user');
    }
  }

  /*editCandidate() 
  {
    let bodyData = {
      "image" : this.image,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "age": this.age,
      "gen": this.gen,
      "intro": this.intro,
      
     };  
    console.log(bodyData);      

    this.http.put("http://localhost:3000/candidate/editCandidate/"+this.router.snapshot.params['id'],bodyData,{responseType:'text'}).subscribe(data => {
      alert("Update Candidate Success!");    
      
    })
  }*/
  showCandidateBy() {
    this.http.get<any>('http://localhost:3000/candidate/getCandidateBy/'+this.router.snapshot.params['id']).subscribe(data => {
      this.results = data;
    })

    
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        Swal.fire('invalid format', 'Error','warning') 
        alert('invalid format')
        this.editcandidatesForm.reset();
      }
      else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            this.editcandidatesForm.patchValue({
              image: reader.result
            });
          } else {
            console.error('Reader result is not a string:', reader.result);
          }
        }
      }
    }
  }

}