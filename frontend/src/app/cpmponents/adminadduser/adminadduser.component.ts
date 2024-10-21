import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminadduser',
  templateUrl: './adminadduser.component.html',
  styleUrls: ['./adminadduser.component.css']
})
export class AdminadduserComponent implements OnInit{
  adduserForm = new FormGroup({    
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    gender: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
    phone: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  })
  gender1: string[] = ['Male', 'Female', 'Other']
  role1:string[]=['admin', 'user']
  get firstname(){
    return this.adduserForm.get('firstname');
  }  
  get lastname(){
    return this.adduserForm.get('lastname');
  }
  get age(){
    return this.adduserForm.get('age');
  }
  get username(){
    return this.adduserForm.get('username');
  }
  get password(){
    return this.adduserForm.get('password')
  }
  get gender(){
    return this.adduserForm.get('gender')
  }  
  get phone() {
    return this.adduserForm.get('phone');
  }
  get image(){
    return this.adduserForm.get('image');
  }
  get file(){
    return this.adduserForm.get('file');
  }
  get role(){
    return this.adduserForm.get('role');
  }


  constructor(private rs: RegisterService){}
  
  ngOnInit(): void {
    
  }



  @Output() commuDataChanged = new EventEmitter<boolean>();
  CommuData: boolean = false;

  onClickToGoodPassword() {
    this.CommuData = !this.CommuData;
    this.commuDataChanged.emit(this.CommuData);
  }

  CreateUser() {
    if (this.adduserForm.valid){
      console.log("user create")
    this.rs.CreateUser(this.adduserForm.value).subscribe(      
      data => {        
        Swal.fire('Create !', 'successfully','success').then(()=>{            
          this.adduserForm.reset();
        })                
      },
      err => {
        console.log(err);
      }     
    );
    }
    else{      
      Swal.fire('Cannot create user!', 'sorry','warning')
    }
    console.log(this.adduserForm.value)
  }


  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();

      if (!file.type.match(pattern)) {        
        Swal.fire('invalid format!', 'sorry','warning')
        this.adduserForm.reset();
      }
      else {
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (typeof reader.result === 'string') {
            
            this.adduserForm.patchValue({
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
    this.adduserForm.reset();    
  }
}

















