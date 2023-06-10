import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DoctorService } from "../service/doctor.service";
import { DoctorType } from "../../types/doctor.type";
import { Observable } from "rxjs";
import { IPFS_API } from "../../environments/environment";

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit, AfterViewInit {


  image: string | undefined;

  doctorList: DoctorType[] = []

  ipfsAPi = IPFS_API

  constructor(private ds: DoctorService) {
  }

  ngAfterViewInit() {
    this.getDoctors()
  }

  ngOnInit(): void {
  }

  getDoctors() {
    this.doctorList = []
    this.ds.getDoctors().then((d: Observable<DoctorType>[]) => {
      d.forEach(doc => {
        doc.subscribe(doctor => {
          this.doctorList.push(doctor)
        })
      })
    })
  }

  deleteDoctor(docID: string) {
    this.ds.deleteDoctor(docID).then((r: boolean) => {
      this.getDoctors()
    })
  }
  getIpfsUrl(path: string) {
    return this.ipfsAPi + path;
  }


}
