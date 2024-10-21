import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './../../services/register/register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
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
    role: new FormControl('user', [Validators.required])
  })
  gender1: string[] = ['Male', 'Female', 'Other']
  
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

  constructor(private rs: RegisterService,private http: HttpClient,private router: Router){}
  role : string="user";
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
      let userdata = this.adduserForm.getRawValue()
      console.log('userdata : '+ userdata)
    //this.rs.CreateUser(this.adduserForm.value)
     this.http.post<any>('http://localhost:3000/user/addUser' ,userdata,{withCredentials:true}).subscribe(      
      () => {
        this.adduserForm.value.role = 'user'
        Swal.fire('Create success!', '','success').then(()=>{
        this.router.navigate(['login'])
        this.adduserForm.reset();        
        })
        //alert('Create User successfully');        
        console.log("user create sucss")
        
      },
      err => {
        console.log(err);
      }     
    );
    }
    else{
      Swal.fire('Sorry !', '','warning')
    }
    console.log(this.adduserForm.value)
  }


  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();

      if (!file.type.match(pattern)) {
        alert('invalid format')
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