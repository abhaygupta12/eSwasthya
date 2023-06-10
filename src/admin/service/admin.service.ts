import {Injectable} from '@angular/core';
import {BlockchainService} from "../../service/blockchain.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private bs: BlockchainService) {
  }

  checkIsAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.bs.getContract().then(c => {
        this.bs.getCurrentAccount().then(a => {
          c.methods.isAdmin().call({from: a}).then((r: any) => {
            resolve(r)
          }).catch((er: any) => {
            console.log(er)
            reject(er)
          })
        })
      })
    })
  }
}
