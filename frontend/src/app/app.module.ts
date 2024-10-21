import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './cpmponents/home/home.component';
import { NavbarComponent } from './cpmponents/navbar/navbar.component';
import { LoginComponent } from './cpmponents/login/login.component';
import { RegisterComponent } from './cpmponents/register/register.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { MenubarComponent } from './cpmponents/menubar/menubar.component';
import { GoodpasswordComponent } from './cpmponents/goodpassword/goodpassword.component';
import { AdmindashboardComponent } from './cpmponents/admindashboard/admindashboard.component';
import { ResetpasswordComponent } from './cpmponents/resetpassword/resetpassword.component';
import { ReportComponent } from './cpmponents/report/report.component';
import { AddcandidatesComponent } from './cpmponents/addcandidates/addcandidates.component';
import { AddeventComponent } from './cpmponents/addevent/addevent.component';
import { ReportforAdminComponent } from './cpmponents/reportfor-admin/reportfor-admin.component';
import { AdminReportComponent } from './cpmponents/admin-report/admin-report.component';
import { ManageEventComponent } from './cpmponents/manage-event/manage-event.component';
import { ManageuserComponent } from './cpmponents/manageuser/manageuser.component';
import { DashboardComponent } from './cpmponents/dashboard/dashboard.component';
import { VoteComponent } from './cpmponents/vote/vote.component';
import { DetailComponent } from './cpmponents/detail/detail.component';
import { MainComponent } from './cpmponents/main/main.component';
import { UserresetpasswordComponent } from './cpmponents/userresetpassword/userresetpassword.component';
import { EditeventComponent } from './cpmponents/editevent/editevent.component';
import { EditcandidatesComponent } from './cpmponents/editcandidates/editcandidates.component';
import { EventComponent } from './cpmponents/event/event.component';
import { AdminEditUesrComponent } from './cpmponents/admin-edit-uesr/admin-edit-uesr.component';
import { AdminadduserComponent } from './cpmponents/adminadduser/adminadduser.component';
import { UserprofileComponent } from './cpmponents/userprofile/userprofile/userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    RegisterComponent,
    MenubarComponent,
    LoginComponent,
    GoodpasswordComponent,
    NavbarComponent,
    AdmindashboardComponent,
    ResetpasswordComponent,
    ReportComponent,    
    AddeventComponent,
    ReportforAdminComponent,
    AdminReportComponent,
    ManageEventComponent,
    ManageuserComponent,
    DashboardComponent,
    VoteComponent,
    DetailComponent,
    MainComponent,
    UserresetpasswordComponent,
    EditeventComponent,
    EditcandidatesComponent,
    EventComponent,    
    AdminadduserComponent,
    AdminEditUesrComponent ,
    AddcandidatesComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
