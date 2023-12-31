import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {
    path: "admin", loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: "patient", loadChildren: () =>
      import('../pateint/pateint.module').then((m) => m.PateintModule)
  },
  {
    path: "doctor", loadChildren: () =>
      import('../doctor/doctor.module').then((m) => m.DoctorModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
