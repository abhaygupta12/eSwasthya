import {Injectable} from '@angular/core';
import {BlockchainService} from "../../service/blockchain.service";
import {RecordsType} from "../../types/record.type";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private bs: BlockchainService) {
  }

  checkIsPatient(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.isPatient().call({from: a})
           .then((data: any) => {
             resolve(data)
           }).catch((er: any) => {
            console.log(er)
          })
        })
      })
    })
  }

  getPatientRecords(): Promise<RecordsType> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.viewMedRec().call({from: a})
           .then((data: any) => {
             resolve(data)
           }).catch((er: any) => {
            console.log(er)
          })
        })
      })
    })
  }
}
