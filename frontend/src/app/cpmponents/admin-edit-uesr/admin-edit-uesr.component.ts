import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AdminService } from 'src/app/services/admin/admin.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-uesr',
  templateUrl: './admin-edit-uesr.component.html',
  styleUrls: ['./admin-edit-uesr.component.css']
})
export class AdminEditUesrComponent implements OnInit {
  updateForm = new FormGroup({
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
  get firstname() {
    return this.updateForm.get('firstname');
  }
  get lastname() {
    return this.updateForm.get('lastname');
  }
  get age() {
    return this.updateForm.get('age');
  }
  get username() {
    return this.updateForm.get('username');
  }
  get password() {
    return this.updateForm.get('password')
  }
  get gender() {
    return this.updateForm.get('gender')
  }
  get phone() {
    return this.updateForm.get('phone');
  }
  get image() {
    return this.updateForm.get('image');
  }
  get file() {
    return this.updateForm.get('file');
  }


  constructor(private http: HttpClient, private ad: AdminService, private router: ActivatedRoute) { }
  isInputDisabled: boolean = true;
  ngOnInit(): void {
    this.showUserBy()
  }


  @Output() commuDataChanged = new EventEmitter<boolean>();
  CommuData: boolean = false;

  onClickToGoodPassword() {
    this.CommuData = !this.CommuData;
    this.commuDataChanged.emit(this.CommuData);
  }results: any=[];

  UpdateUser() {     
    console.log(this.updateForm.value)
    console.log("valid status : "+this.updateForm.valid)
    if (this.updateForm.value) {
      console.log("user create")
      this.ad.updateUser(this.updateForm.value,this.router.snapshot.params['id']).subscribe(
        data => {
          Swal.fire('Upadte !', 'successfully','success').then(()=>{            
            this.updateForm.reset();
          }) 
          console.log("update user sucss")          
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      alert('Cannot create user');
      Swal.fire('Cannot create user!', 'soryy','warning').then(()=>{            
        this.updateForm.reset();
      })
    }
    
  }


  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {        
        Swal.fire('invalid format!', 'sorry','warning')
        this.updateForm.reset();
      }
      else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            this.updateForm.patchValue({
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
    this.updateForm.reset();
  }
  showUserBy() {
    this.http.get<any>('http://localhost:3000/user/getUserBy/' + this.router.snapshot.params['id']).subscribe(data => {
      this.results = data;
    })
  }

}
