import {Component, OnInit} from '@angular/core';
import {AdminService} from "../service/admin.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  prgShow: boolean = false;
  prgMsg: string = "Checking is Admin..."
  prgWarning: boolean = false
  prgSuccess: boolean = false

  isAdmin:boolean = false

  prgBtnTxt: string = ""

  constructor(private as: AdminService) {
  }

  ngOnInit(): void {
    this.prgShow = true
    this.as.checkIsAdmin().then(r => {
      if (r) {
        this.prgShow = false
        this.isAdmin = true
      }
      else {
        this.prgMsg = "Please connect metamask to admin account"
        this.prgWarning = true
      }
    }).catch((er:any)=>{
      this.prgMsg = "Please connect metamask to admin account"
      this.prgWarning = true
    })

  }

}
