import {Injectable} from '@angular/core';
import Web3 from "web3";

const Contract = require('../../build/contracts/Medical.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private web3!: Web3
  private account: string | undefined
  private netId!: number;
  private abi: any;
  private netWorkData: any;
  private address: any;
  private contract: any;

  constructor() {
    this.getWeb3Provider().then((web3: Web3) => {
      web3.eth.net
          .getId()
          .then((id: number) => {
            this.netId = id;
            this.abi = Contract.abi;
            this.netWorkData = Contract.networks[this.netId];
            if (this.netWorkData) {
              this.address = this.netWorkData.address;
              this.contract = new web3.eth.Contract(this.abi, this.address);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    })
    window.ethereum.on('accountsChanged', (acc: any) => {
      console.log(acc);
      window.location.reload();
    });
  }

  getContract(): Promise<any> {
    let reTry = false;
    return new Promise((resolve, reject) => {
      let check = setInterval(() => {
        if (this.contract != undefined) {
          resolve(this.contract);
          clearInterval(check);
        }
        else {
          if (!reTry) {
            this.getContract()
            reTry = true;
          }
          else {
            reject(null);
          }
        }
      }, 1000);
    });
  }

  getCurrentAccount(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.web3) {
        this.web3.eth.getAccounts().then((acc: string[]) => {
          // console.log(acc[0]);
          resolve(acc[0]);
        });
      }
      else {
        reject(null);
      }
    });
  }

  async getWeb3Provider() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      this.web3 = window.web3;
      this.web3.eth.getAccounts().then((acc: string[]) => {
        this.account = acc[0]
      });
      return window.web3;
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return window.web3;
    }
    else {
      return window.web3;
    }
  }
}
