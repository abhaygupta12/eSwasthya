import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DoctorType } from "../../types/doctor.type";
import { BlockchainService } from "../../service/blockchain.service";
import { IpfsService } from "../../service/ipfs.service";
import { HttpClient } from "@angular/common/http";
import { IPFSHTTPClient } from "ipfs-http-client";
import { IPFS_API } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  ipfs: IPFSHTTPClient
  account: string = ''
  private api: string = IPFS_API;

  constructor(private bs: BlockchainService, private is: IpfsService, private http: HttpClient) {
    this.ipfs = is.getIPFS()
    bs.getCurrentAccount().then(a => {
      this.account = a
    })
  }

  getDoctors(): Promise<Observable<DoctorType>[]> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        c.methods.doctorList().call().then((list: any) => {
          this.loadDataFromIPFS(this.removeDuplicates(list)).then(data => {
            resolve(data)
          })
        }).catch((er: any) => {
          console.log(er)
          reject(null)
        })
      })
    })
  }

  removeDuplicates(arr: []) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  
  loadDataFromIPFS(_docList: string[]): Promise<Observable<DoctorType>[]> {
    return new Promise((resolve, reject) => {
      let docList: Observable<DoctorType>[] = []
      _docList.forEach(doc => {
        docList.push(this.http.get<DoctorType>(this.api + doc))
      })
      resolve(docList)
    })
  }

  getAccessStatus(docList: DoctorType[]): Promise<DoctorType[]> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          let Doctors: DoctorType[] = [];
          docList.forEach(doc => {
            c.methods.checkPermission(doc.docID).call({ from: a })
              .then((data: any) => {
                // console.log(data)
                let doctor = doc;
                doctor.hasAccess = data
                Doctors.push(doctor);
                if (docList.length == Doctors.length) {
                  resolve(Doctors)
                }
              }).catch((er: any) => {
                console.log(er)
              })
          })

        })
      })
    })
  }


  grantDoctorAccess(docId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.givePermission(docId).send({ from: a })
            .on('confirmation', (r: any) => {
              console.log(r)
              resolve(r)
            }).on('error', (er: any) => {
              console.log(er)
              reject(er)
            })
        })
      })
    })
  }


  revokeDoctorAccess(docId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.removePermission(docId).send({ from: a })
            .on('confirmation', (r: any) => {
              console.log(r)
              resolve(r)
            }).on('error', (er: any) => {
              console.log(er)
              reject(er)
            })
        })
      })
    })
  }

}
