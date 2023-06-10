import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../service/doctor.service";
import {DoctorType} from "../../types/doctor.type";

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  prgShow: boolean = true
  prgMsg: string = "Checking is Connected as Doctor"
  prgSuccess: boolean = false
  prgWarning: boolean = false;
  isDoctor: boolean = false;

  doctor!: DoctorType

  constructor(private ds: DoctorService) {
  }

  ngOnInit(): void {
    this.ds.checkIsDoctor().then((r: any) => {
      if (r) {
        this.prgShow = false
        this.isDoctor = true
      }
      else {
        this.prgWarning = true
        this.prgMsg = "Connect Metamask to Doctor Account"
      }
    })
  }


}
