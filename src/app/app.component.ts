import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import { Cuss2Service, ICuss2ServiceOptions } from '@elevated-libs/cuss2-angular';
import {ApplicationStates, Cuss2} from "@elevated-libs/cuss2";
import ApplicationStateCodeEnum = ApplicationStates.ApplicationStateCodeEnum;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cuss2-example-angular';
  private alive: boolean = true;
  cuss2?: Cuss2;

  constructor(private cuss2Service: Cuss2Service){}

  async ngOnInit(): Promise<void> {
    // this.cuss2Service.logger = true
    // TODO: make it so the config only has to be passed in on module creation
    const cuss2 = await this.cuss2Service.start(environment.cuss2Config as ICuss2ServiceOptions);
    this.cuss2 = cuss2;
    cuss2.stateChange.subscribe(async (state: ApplicationStateCodeEnum) => {
      console.log(state)
      this.title = state
    });
    // if (cuss2.bagTagPrinter) cuss2.bagTagPrinter.required = false;
    if (cuss2.boardingPassPrinter) cuss2.boardingPassPrinter.required = false;
    if (cuss2.documentReader) cuss2.documentReader.required = false;
    // if (cuss2.barcodeReader) cuss2.barcodeReader.required = false;
    if (cuss2.announcement) cuss2.announcement.required = false;
    if (cuss2.keypad) cuss2.keypad.required = false;
    if (cuss2.msrPayment) cuss2.msrPayment.required = false;



    // @ts-ignore
    window.cuss2 = cuss2
    cuss2.applicationOnline = true;
    cuss2.onmessage.subscribe((e)=>{
      console.log(e)
    })

  }

  exit() : void {
    this.cuss2?.requestAvailableState();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
