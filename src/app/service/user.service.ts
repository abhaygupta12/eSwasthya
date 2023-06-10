import {Injectable} from '@angular/core';
import {BlockchainService} from "../../service/blockchain.service";
import {IPFSHTTPClient} from "ipfs-http-client";
import {IpfsService} from "../../service/ipfs.service";
import {User} from "../../types/user.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ipfs!: IPFSHTTPClient
  account: string = ''

  constructor(private bs: BlockchainService, private is: IpfsService) {
    this.ipfs = this.is.getIPFS()
  }

  addPatient(data: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //addPatInfo
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          this.ipfs.add(Buffer.from(JSON.stringify(data))).then(hash => {
            c.methods.addPatInfo(hash.path).send({from: a})
             .on('confirmation', (r: any) => {
               resolve(true)
             }).on('error', (er: any) => {
              reject(er)
            })
          })
        })
      })

    })
  }

  getAccount(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bs.getCurrentAccount().then(a => {
        this.account = a
        resolve(a)
      }).catch(er => {
        console.log(er)
        reject(er)
      })
    })

  }


}
