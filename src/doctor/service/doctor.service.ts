import { Injectable } from '@angular/core';
import { BlockchainService } from "../../service/blockchain.service";
import { IPFS_API } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private api: string = IPFS_API;

  constructor(private bs: BlockchainService, private http: HttpClient) {
  }

  checkIsDoctor(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.isDoctor().call({ from: a }).then((r: any) => {
            resolve(r)
          }).catch((er: any) => {
            reject(er)
          })
        })
      })
    })
  }

  getPatients(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        c.methods.getPatientList().call().then((r: any) => {
          resolve(r)
        })
      })
    })
  }

  getPatientInfo(pats: string[]): Promise<any> {
    let patients: any[] = []
    return new Promise((resolve, reject) => {
      pats.forEach((p: string, i: number) => {
        this.bs.getContract().then(c => {
          c.methods.getPatientinfo(p).call().then((r: any) => {
            this.http.get(this.api + r).subscribe((ps: any) => {
              console.log(ps);
              
              patients.push(ps)
              if (pats.length == i + 1) {
                console.log(patients);

                resolve(patients)
              }
            })
          })
        })
      })

    })
  }

}
