import {Component, OnInit} from '@angular/core';
import {PatientService} from "../service/patient.service";

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  prgShow: boolean = true;
  prgMsg: string = "Checking is Patient...";
  prgSuccess: boolean = false;
  prgWarning: boolean = false;
  isPatient: boolean = false;

  constructor(private ps: PatientService) {
  }

  ngOnInit(): void {
    this.ps.checkIsPatient().then((r: any) => {
      console.log(r)
      if (r) {
        this.isPatient = true
        this.prgShow = false
      }
      else {
        this.prgWarning = true
        this.prgMsg = " Connect Metamask to Patient Account"
      }
    })
  }

}
