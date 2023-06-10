import { Injectable } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { BlockchainService } from 'src/service/blockchain.service';
import { IpfsService } from 'src/service/ipfs.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  ipfs: IPFSHTTPClient

  constructor(private bs: BlockchainService, is: IpfsService) {
    this.ipfs = is.getIPFS()
  }

  addMedRecords(ipfsHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          console.log(ipfsHash, a)
          c.methods.addMedRecord(ipfsHash, a).send({ from: a })
            .then((r: any) => {
              console.log(r)
              resolve(r)
            }).catch((er: any) => {
              reject(er)
            })
        })
      })
    })
  }

  deleterecords(hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.deleteRecord(hash).send({ from: a })
            .on('confirmation', (r: any) => {
              resolve(true)
            }).on('error', (err: any) => {
              reject(err)
            })
        })
      })
    })
  }
  addRecordsInIpfs(data: File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ipfs.add(data).then(r => {
        resolve(r.path)
      }).catch((er: any) => {
        reject(er)
      })
    })
  }
}
