import { Component, OnInit } from '@angular/core';
import { IPFS_API } from "../../environments/environment";
import { PatientService } from "../service/patient.service";
import { MedicalRecordsService } from 'src/doctor/service/medical-records.service';
import { MedicalRecordService } from '../service/medical-record.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  files: string[] = [];
  private api: string = IPFS_API;
  isPatient: boolean = false;
  prgShow: boolean = false;
  prgSuccess: boolean = false
  prgWarning: boolean = false
  prgMsg: string = ""

  prgBtnTxt: string = "DONE"

  pId: string = "";
  file: FileList | null = null;
  constructor(private ps: PatientService, private mrs: MedicalRecordService) {
  }

  ngOnInit(): void {
    this.getAllRecords()
  }

  getAllRecords() {
    this.ps.getPatientRecords().then((r: any) => {
      this.files = r
    })
  }
  addRecord() {
    this.prgShow = true
    this.prgMsg = "Adding Medical Record..."
    if (this.file?.item(0) != null) {
      this.prgMsg = "Adding Medical Record to IPFS..."
      // @ts-ignore
      this.mrs.addRecordsInIpfs(this.file?.item(0))
        .then((hash: string) => {
          this.prgMsg = "Adding IPFS hash to Blockchain..."
          this.mrs.addMedRecords(hash)
            .then((r: boolean) => {
              if (r) {
                this.prgSuccess = true
                this.prgMsg = "Medical Records Added to Blockchain"
                this.isPatient = false
                this.file = null
                this.getAllRecords()
              }
              else {
                this.prgSuccess = true
                this.prgMsg = "Adding to Blockchain Failed"
                this.isPatient = false
              }
            })
            .catch((er: any) => {
              console.log(er)
              this.prgSuccess = true
              this.prgMsg = "Adding to Blockchain Failed"
              this.isPatient = false
            })
        })
    } else {
      this.prgSuccess = false
      this.prgWarning = true
      this.prgMsg = 'select a file'
    }
  }

  onFileSelected(ev: Event) {
    this.file = (ev.target as HTMLInputElement).files
    console.log(this.file?.item(0))
  }

  onDeleteRecord(hash: string) {
    this.prgShow = true
    this.prgMsg = 'deleting records'
    this.mrs.deleterecords(hash).then((r) => {
      console.log(r);
      this.closePrg()
      this.getAllRecords()
    })
  }

  closePrg() {
    this.prgShow = false
    this.prgWarning = false
    this.prgSuccess = false
    this.prgMsg = "Loading..."
    this.pId = ""
  }
  getIPFSUrl(hash: string) {
    return this.api + hash
  }
}
