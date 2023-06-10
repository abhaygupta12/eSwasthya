import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DoctorType} from "../../types/doctor.type";
import {IPFS_API} from "../../environments/environment";
import {Observable} from "rxjs";
import {DoctorService} from "../service/doctor.service";

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit, AfterViewInit {
  image: string | undefined;

  doctorList: DoctorType[] = []

  ipfsAPi = IPFS_API

  prgShow: boolean = false
  prgSuccess: boolean = false
  prgWarning: boolean = false
  prgBtnTxt: string = 'DONE'

  prgMsg: string = "Granting access to Doctor"

  constructor(private ds: DoctorService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadDoctorDetails()
  }

  loadDoctorDetails() {
    this.doctorList = []
    this.ds.getDoctors().then((d: Observable<DoctorType>[]) => {
      d.forEach(doc => {
        doc.subscribe(doctor => {
          this.doctorList.push(doctor)
          if (d.length == this.doctorList.length) {
            this.ds.getAccessStatus(this.doctorList).then((docs: DoctorType[]) => {
              this.doctorList = docs
            })
          }
        })
      })
    })
  }

  grantAccessToDoc(docID: string) {
    this.prgMsg = "Granting Access to Doctor"
    this.prgShow = true
    this.ds.grantDoctorAccess(docID).then((r: any) => {
      if (r) {
        this.prgSuccess = true
        this.prgMsg = "Granted Access to Doctor"
      }
      this.loadDoctorDetails()
    }).catch((er: any) => {
      this.prgMsg = "Failed Granting Access"
      console.log(er)
    })
  }

  revokeAccessToDoc(docID: string) {
    this.prgMsg = "Revoking Access to Doctor"
    this.prgShow = true
    this.ds.revokeDoctorAccess(docID).then((r: any) => {
      if (r) {
        this.prgSuccess = true
        this.prgMsg = "Revoked Access to Doctor"
      }
      this.loadDoctorDetails()
    }).catch((er: any) => {
      this.prgMsg = "Failed Revoking Access"
      console.log(er)
    })
  }

  getIpfsUrl(path: string) {
    return this.ipfsAPi + path;
  }

  closePrg() {
    this.prgShow = false
    this.prgSuccess = false
    this.prgWarning = false
  }
}
