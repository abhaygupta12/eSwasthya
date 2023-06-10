import { Injectable } from '@angular/core';
import { BlockchainService } from "../../service/blockchain.service";
import { IPFSHTTPClient } from "ipfs-http-client";
import { IpfsService } from "../../service/ipfs.service";
import { DoctorType } from "../../types/doctor.type";
import { HttpClient } from "@angular/common/http";
import { IPFS_API } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  ipfs!: IPFSHTTPClient
  api = IPFS_API
  private account!: string;

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

  addDoctorToNetwork(data: DoctorType): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ipfs.add(Buffer.from(JSON.stringify(data)))
        .then(ipfsHash => {
          this.bs.getContract().then(c => {
            c.methods.addDoctor(data.docID, ipfsHash.path)
              .send({ from: this.account }).on('confirmation', (r: any) => {
                console.log(r)
                resolve(true)
              }).on('error', (er: any) => {
                console.log(er)
                reject(er)
              })
          })
        })
    })
  }
  deleteDoctor(docID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then(c => {
        c.methods.removeDoctor(docID).send({ from: this.account }).on('confirmation', (r: number) => {
          resolve(r ? true : false)
        }).on('error', (err: any) => {
          reject(err)
        })
      })
    })
  }
  loadDataFromIPFS(_docList: string[]): Promise<Observable<DoctorType>[]> {
    return new Promise((resolve, reject) => {
      let docList: Observable<DoctorType>[] = []
      _docList.forEach(doc => {
        doc ?
          docList.push(this.http.get<DoctorType>(this.api + doc)) : null
      })
      resolve(docList)
    })
  }

  uploadImage(img: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ipfs.add(img).then(r => {
        resolve(r.path)
      })
    })
  }

  uploadDocument(doc: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ipfs.add(doc).then(r => {
        resolve(r.path)
      })
    })
  }

  async dataURItoBlob(dataURI: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const byteString = window.atob(dataURI.replace(/^[^,]+,/, ''));
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      resolve(blob);
    });
  }
}
