import { Component, OnInit } from '@angular/core';
import { MedicalRecordsService } from "../service/medical-records.service";
import { IPFS_API } from "../../environments/environment";
import { DoctorService } from '../service/doctor.service';
declare let bootstrap: any;
interface Patient {
  city: string;
  dob: string;
  email: string;
  fName: string;
  lName: string;
  pID: string;
  phone: string;
  sex: number
  state: string;
}

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.component.html',
  styleUrls: ['./view-records.component.css']
})
export class ViewRecordsComponent implements OnInit {
  isPatient: boolean = false;
  prgShow: boolean = false;
  prgSuccess: boolean = false
  prgWarning: boolean = false
  prgMsg: string = ""

  prgBtnTxt: string = "DONE"

  pId: string = "";

  files!: [];

  api: string = IPFS_API

  patients: Patient[] = []
  loading: boolean = true;

  constructor(private mrs: MedicalRecordsService, private ds: DoctorService) {
  }

  ngOnInit(): void {
    this.getPatients()
  }

  checkHasAccess(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mrs.checkAccessToRecords(id).then((r: any) => {
        console.log(r);

        if (r) {
          resolve(true)
        }
        else {
          resolve(false)
        }
      }).catch((er: any) => {
        console.log(er)
      })
    })
  }

  viewRecord(id: string) {
    this.prgShow = true
    this.prgMsg = 'loading records...'
    this.files = []
    this.mrs.viewPatientRecords(id).then((r: any) => {
      console.log(r)
      if (r.length <= 0) {
        this.prgSuccess = true
        this.prgMsg = '0 records found'
      } else {
        const modal = new bootstrap.Modal('#recModal')
        this.prgSuccess = true
        this.prgMsg = r.length + ' records found'
        this.files = r
        setInterval(() => {
          this.closePrg()
        }, 1500)
        modal.show()
      }

    }).catch((er: any) => {
      console.log(er)
    })
  }

  getPatients() {
    let _pats: string[] = []
    this.ds.getPatients().then((p: string[]) => {
      // console.log(r);
      p.forEach((a: string, i: number) => {
        this.checkHasAccess(a).then(r => {
          console.log(r);
          if (r) _pats.push(a)
          if (i + 1 == p.length) {
            this.ds.getPatientInfo(_pats).then(r => {
              this.patients = r
            })
            this.loading = false
          }
          setInterval(()=>{
            this.loading = false;
          },1000)
        })
      })
      
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
