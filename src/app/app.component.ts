import {Component, OnInit} from '@angular/core';
import {BlockchainService} from "../service/blockchain.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DivyaEHR';

  prgShow: boolean = true;
  prgWarning: boolean = false;
  prgMsg: string = "Connecting to Blockchain....";

  constructor(private bs: BlockchainService) {
  }

  ngOnInit() {
    this.bs.getContract().then(c => {
      if (c != null) {
        this.prgShow = false
      }
      else {
        this.prgWarning = true
        this.prgMsg = "Please Connect to Metamask"
      }
    })

  }
}
