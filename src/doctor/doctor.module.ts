import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { UtilsModule } from "../utils/utils.module";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    ViewRecordsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    UtilsModule,
    FormsModule
  ]
})
export class DoctorModule { }
