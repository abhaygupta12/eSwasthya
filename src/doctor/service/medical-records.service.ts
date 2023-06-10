import { Injectable } from '@angular/core';
import { BlockchainService } from "../../service/blockchain.service";
import { IPFSHTTPClient } from "ipfs-http-client";
import { IpfsService } from "../../service/ipfs.service";
import { RecordsType } from "../../types/record.type";

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordsService {

  ipfs: IPFSHTTPClient

  constructor(private bs: BlockchainService, is: IpfsService) {
    this.ipfs = is.getIPFS()
  }

  checkAccessToRecords(pId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.checkPermission(a).call({ from: pId })
            .then((r: any) => {
              resolve(r)
            }).catch((er: any) => {
              reject(er)
            })
        })
      })
    })
  }

  viewPatientRecords(pId: string): Promise<RecordsType> {
    return new Promise<RecordsType>((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.viewMedRecOfPatient(pId).call({ from: a })
            .then((r: any) => {
              resolve(r)
            }).catch((er: any) => {
              reject(er)
            })
        })
      })
    })
  }

}
