import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcandidates',
  templateUrl: './addcandidates.component.html',
  styleUrls: ['./addcandidates.component.css']
})
export class AddcandidatesComponent implements OnInit {
  addcandidatesForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    gender: new FormControl(''),
    intro: new FormControl('', [Validators.required])
  })
  constructor(private http:HttpClient , private router:ActivatedRoute) {}

  ngOnInit(): void {
    
  }
  get file(){
    return this.addcandidatesForm.get('file')
  }
  get img() { return this.addcandidatesForm.get('image'); }

  get firstname() { return this.addcandidatesForm.get('firstname'); }

  get lastname() { return this.addcandidatesForm.get('fastname'); }

  get age() { return this.addcandidatesForm.get('age'); }

  get intro() { return this.addcandidatesForm.get('intro'); }

  gender: string[] = ['Male', 'Female', 'Other']
  
  addCandidate() 
  {   
    if (this.addcandidatesForm.valid){
      console.log("user create")
      console.log(this.addcandidatesForm.value);
      
    this.CreateCandi(this.addcandidatesForm.value).subscribe(      
      data => {
        this.addEventJCandidate(data)
        Swal.fire('Create candidates !', 'success','success').then(()=>{
          this.addcandidatesForm.reset(); 
        })
        //alert('Create candidates successfully');
        console.log("candidates create sucss")        
       
               
      },
      err => {
        console.log(err);
      }     
    );
    }
    else{
      Swal.fire('Cannot create !', 'sorry','warning')
    }      
  }
  CreateCandi(userdata: any){
    console.log("service user create")
    return this.http.post<any>('http://localhost:3000/candidate/addCandidate' ,userdata)
    .pipe(map(data =>{
      return data;
    }))
  }

  addEventJCandidate(data:string) {

    let bodyData2 = {
      "candidate_id" : data,
      "event_id": this.router.snapshot.params['id'],
     };

    this.http.post("http://localhost:3000/editevent/addEventAcandidate",bodyData2,{responseType:'text'}).subscribe(data => {
      Swal.fire('', 'success','success')

    })

  }
  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();

      if (!file.type.match(pattern)) {
        Swal.fire('invalid format !', 'Error','warning')        
        this.addcandidatesForm.reset();
      }
      else {
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (typeof reader.result === 'string') {
            
            this.addcandidatesForm.patchValue({
              image: reader.result
            });
          } else {
            console.error('Reader result is not a string:', reader.result);
          }
        }
      }
    }
  }

  resetForm() {
    this.addcandidatesForm.reset();    
  }



}


