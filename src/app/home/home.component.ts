import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from "../../types/user.type";
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('male') mRadio!: ElementRef;
  @ViewChild('female') fRadio!: ElementRef;
  @ViewChild('other') oRadio!: ElementRef;
  User: User = {
    pID: '',
    fName: '',
    lName: '',
    city: '',
    state: '',
    phone: null,
    email: '',
    dob: null,
    sex: null,
  };

  SX = {
    male: 0,
    female: 0,
    other: 0,
  };

  prgShow: boolean = false;
  prgMsg: string = "Adding user to Network..."
  prgWarning: boolean = false
  prgSuccess: boolean = false

  prgBtnTxt: string = "Retry"

  constructor(private us: UserService) {
  }

  ngOnInit(): void {
    this.getCurrentAccount()
  }

  onSubmit() {
    this.prgShow = true
    this.prgMsg = "Adding User to Network..."
    this.us.addPatient(this.User).then((r: any) => {
      this.prgSuccess = true
      this.prgMsg = "Patient added to Network"
      this.prgBtnTxt = "DONE"
      this.User = {
        pID: '',
        fName: '',
        lName: '',
        city: '',
        state: '',
        phone: null,
        email: '',
        dob: null,
        sex: null,
      };
    }).catch(er => {
      this.prgWarning = true
      this.prgMsg = "Adding User to Network Failed .."
    })
  }

  getCurrentAccount() {
    this.us.getAccount().then(acc => {
      this.User.pID = acc
    })
  }

  onXchange() {
    if (this.SX.male) {
      this.User.sex = 1;
      this.fRadio.nativeElement.disabled = true;
      this.oRadio.nativeElement.disabled = true;
    }
    else if (this.SX.female) {
      this.User.sex = 2;
      this.mRadio.nativeElement.disabled = true;
      this.oRadio.nativeElement.disabled = true;
    }
    else if (this.SX.other) {
      this.User.sex = 3;
      this.fRadio.nativeElement.disabled = true;
      this.mRadio.nativeElement.disabled = true;
    }
    else {
      this.mRadio.nativeElement.disabled = false;
      this.fRadio.nativeElement.disabled = false;
      this.oRadio.nativeElement.disabled = false;
    }
  }

  closePrg() {
    this.prgShow = false
    this.prgSuccess = false
    this.prgWarning = false
  }
}
