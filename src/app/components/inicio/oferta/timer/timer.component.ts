import { Component, OnInit, Input } from '@angular/core';
import * as countdown from 'countdown';
import { isString } from 'util';
interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input() date: string | Date;
  @Input() bgColor: string;

  public time: Time = null;
  public timerId: number = null;
  constructor() {}

  ngOnInit(): void {
    //date de offer
    // let date = new Date('2021-11-25');
    if (isString(this.date)) {
      this.date = new Date(this.date);
    }
    console.log('timeeeeeeee', this.date);
    this.timerId = countdown(
      this.date,
      (ts) => {
        this.time = ts;
      },
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
