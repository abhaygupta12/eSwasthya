import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() prgSuccess: boolean = false;
  @Input() prgWarning: boolean = false;
  @Input() prgMsg: string = 'Loading Progress'
  @Input() btnTxt: string = 'Retry'

  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  onBtnClick() {
    this.btnClick.emit()
  }

}
