import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {DoctorViewComponent} from './doctor-view/doctor-view.component';
import {DoctorAddComponent} from './doctor-add/doctor-add.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UtilsModule} from "../utils/utils.module";


@NgModule({
    declarations: [
        AdminDashboardComponent,
        DoctorViewComponent,
        DoctorAddComponent
    ],
    exports: [
        DoctorViewComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule, HttpClientModule, UtilsModule
    ]
})
export class AdminModule {
}
