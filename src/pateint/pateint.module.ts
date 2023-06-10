import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PateintRoutingModule } from './pateint-routing.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import {UtilsModule} from "../utils/utils.module";
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';


@NgModule({
  declarations: [
    PatientDashboardComponent,
    DoctorViewComponent,
    MedicalRecordsComponent
  ],
  imports: [
    CommonModule,
    PateintRoutingModule,
    UtilsModule
  ]
})
export class PateintModule { }
