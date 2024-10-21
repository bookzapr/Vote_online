import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./cpmponents/login/login.component";
import { RegisterComponent } from "./cpmponents/register/register.component";
import { HomeComponent } from "./cpmponents/home/home.component";
import { DetailComponent } from "./cpmponents/detail/detail.component";
import { ReportComponent } from "./cpmponents/report/report.component";
import { VoteComponent } from "./cpmponents/vote/vote.component";
import { DashboardComponent } from "./cpmponents/dashboard/dashboard.component";
import { ManageEventComponent } from "./cpmponents/manage-event/manage-event.component";
import { ManageuserComponent } from "./cpmponents/manageuser/manageuser.component";
import { AdminReportComponent } from "./cpmponents/admin-report/admin-report.component";
import { ReportforAdminComponent } from "./cpmponents/reportfor-admin/reportfor-admin.component";
import { AddeventComponent } from "./cpmponents/addevent/addevent.component";
import { AddcandidatesComponent } from "./cpmponents/addcandidates/addcandidates.component";
import { ResetpasswordComponent } from "./cpmponents/resetpassword/resetpassword.component";
import { AdminadduserComponent } from "./cpmponents/adminadduser/adminadduser.component";
import { EventComponent } from "./cpmponents/event/event.component";
import { EditcandidatesComponent } from "./cpmponents/editcandidates/editcandidates.component";
import { EditeventComponent } from "./cpmponents/editevent/editevent.component";
import { UserresetpasswordComponent } from "./cpmponents/userresetpassword/userresetpassword.component";
import { AdminEditUesrComponent } from "./cpmponents/admin-edit-uesr/admin-edit-uesr.component";
import { MainComponent } from "./cpmponents/main/main.component";
import { UserprofileComponent } from "./cpmponents/userprofile/userprofile/userprofile.component";

const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'detail/:id/:event_id', component: DetailComponent },
    { path: 'report/:id', component: ReportComponent },
    { path: 'vote/:id/:event_id', component: VoteComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'manageuser', component: ManageuserComponent },
    { path: 'manageEvent', component: ManageEventComponent },
    { path: 'adminReport', component: AdminReportComponent },
    { path: 'ReportforAdmin/:id', component: ReportforAdminComponent },
    { path: 'addevent', component: AddeventComponent },
    { path: 'addcandidates/:id', component: AddcandidatesComponent },
    { path: 'resetpassword/:id', component: ResetpasswordComponent },
    { path: 'adduser', component: AdminadduserComponent },
    { path: 'event/:id', component: EventComponent },
    { path: 'edituser/:id', component: AdminEditUesrComponent },
    { path: 'editcandidates/:id/:event_id', component: EditcandidatesComponent },
    { path: 'editevent/:id', component: EditeventComponent },
    { path: 'userresetpassword', component: UserresetpasswordComponent },
    { path: 'userprofile/:id', component: UserprofileComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }