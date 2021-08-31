import { Component as AngularComponent, OnInit, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import { Cuss2Service, ICuss2ServiceOptions } from '@elevated-libs/cuss2-angular';
import {ApplicationStates, Cuss2, Component } from "@elevated-libs/cuss2";
import ApplicationStateCodeEnum = ApplicationStates.ApplicationStateCodeEnum;

@AngularComponent({
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
    this.cuss2Service.logger = true
    // TODO: make it so the config only has to be passed in on module creation
    const cuss2 = await this.cuss2Service.start(environment.cuss2Config as ICuss2ServiceOptions);
    this.cuss2 = cuss2;
    // window.addEventListener("beforeunload", async function(event) {
    //   await cuss2.requestReload()
    // });
    // cuss2.onmessage.subscribe((message:any) =>
    //   console.log(message)
    // )

    cuss2.stateChange.subscribe(async (state: ApplicationStateCodeEnum) => {
      // console.log(state)
      this.title = state
    });
    Object.values(cuss2.components).forEach((c:any) => c.required = false);
    if (cuss2.bagTagPrinter) cuss2.bagTagPrinter.required = true;
    if (cuss2.boardingPassPrinter) cuss2.boardingPassPrinter.required = true;
    // if (cuss2.documentReader) cuss2.documentReader.required = false;
    if (cuss2.barcodeReader) cuss2.barcodeReader.required = true;
    // if (cuss2.announcement) cuss2.announcement.required = false;
    // if (cuss2.keypad) cuss2.keypad.required = false;
    // if (cuss2.msrPayment) cuss2.msrPayment.required = false;

    // @ts-ignore
    window.cuss2 = cuss2


    // await cuss2.boardingPassPrinter?.setupRaw('LT0521580A05010100000000AD002F0060006000000000FFFFFF00000000000000000000000000000000000000000000000000000000000000000000000000000000000000011600010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000D4FFC1E3C1FCD4FF80C1FCD4FF00C1C0D3FFC1FE01C1C0D3FFC1F803C1C0D3FFC1F007C1E0D3FFC1E00FC1FCD3FFC1C01FC1FCD3FF803FC1FCD3FF807FC1FCD3FF00C1FFC1FCD2FFC1FE01C1FFC1FCD2FFC1FC03C1FFC1FCC20007C1C03FC1FE0FC2FF001FC7FFC1FC03C1FFC1FCC200070007C1FE0FC2FFC200C7FFC1F807C1FFC1FCC200060007C1FC07C2FFC2007FC6FFC1F00FC1FFC1FCC200040F87C1FC07C2FFC2003FC6FFC1E00FC1FFC1FCC1FF87C1F83FC1F7C1FC43C2FF0FC1F83FC6FFC1E01FC1FFC1FCC1FF87C1F87FC1FFC1F843C2FF0FC1FE1FC6FFC1E03FC1FFC1FCC1FF87C1F87FC1FFC1F863C2FF0FC1FE18C1E07C01C3FFC1C03FC1FFC1FCC1FF87C1F87FC1FFC1F8C1E1C2FF0FC1FE18C1E07800C3FF807FC1FFC1FCC1FF87C1F87FC1FFC1F0C1E1C2FF0FC1FE184070007FC2FF807FC1FFC1FCC1FF87C1F87FC1FFC2F0C2FF0FC1FE1807C1E1C1FC3FC2FF00C2FFC1FCC1FF87C1F81FC1FFC2F0C2FF0FC1FE180FC1C3C1FE3FC2FF00C2FFC1FCC1FF87C1FC07C1FFC1E1C1F0C2FF0FC1FE181FC1C3C1FE1FC2FF00C2FFC1FCC1FF87C1FE007FC1E1C1F87FC1FF0FC1FC183FC1C3C1FF1F03C1FF01C2FFC1FCC1FF87C1FF003FC1C3C1F87FC1FF0FC1F8387F87C1FF1E01C1FE01C2FFC1FCC1FF87C1FFC1C00FC1C3C1F87FC1FFC200387F87C1FF1C01C1FE03C2FFC1FCC1FF87C1FFC1F807C1C3C1FC3FC1FFC200787F80001E007E03C2FFC1FCC1FF87C1FFC1FE0787C1FC3FC1FF0001C1F87F80001E007C03C2FFC1FCC1FF87C2FF8387C1FC3FC1FF000FC1F87F80001E003C03C2FFC1FCC1FF87C2FFC1C380001FC1FF0FC1FFC1F87F87C2FF801C07C2FFC1FCC1FF87C2FFC1C3C2001FC1FF0FC1FFC1F87FC1C7C2FFC1C00807C2FFC1FCC1FF87C2FFC1C3C2000FC1FF0FC1FFC1F87FC1C3C2FFC1E00007C2FFC1FCC1FF87C2FFC1C20FC1FF0FC1FF0FC1FFC1F87FC1C3C2FFC1F00007C2FFC1FCC1FF87C2FFC1C21FC1FF0FC1FF0FC1FFC1F87FC1C3C2FFC1F0000FC2FFC1FCC1FF87C1F8C1FF861FC1FF87C1FF0FC1FFC1F87FC1E1C2FFC1FC000FC2FFC1FCC1FF87C1F83C063FC1FF87C1FF0FC1FFC1F87FC1E03C3FC1FC000FC2FFC1FCC1FF87C1F8000C3FC1FF87C1FF0FC1FFC1F87FC1F0001FC1FE000FC2FFC1FCC1FF87C1F8001C3FC1FF83C1FF0FC1FFC1F87FC1F8003FC1FF000FC2FFC1FCC1FF87C1FF00783FC1FFC1C3C1FF0FC1FFC1F87FC1FE00C2FF001FC2FFC1FCD1FF801FC2FFC1FCD1FF801FC2FFC1FCD1FFC1C01FC2FFC1FCD1FFC1C01FC2FFC1FCD1FFC1C01FC2FFC1FCD1FFC1C03FC2FFC1FCD1FFC1F8C3FFC1FC')

    // cuss2.applicationOnline = true;

  }

  get components() : Component[] {
    return Object.values<Component>(this.cuss2?.components||{})
  }

  get online() : boolean {
    return Boolean(this.cuss2?.applicationOnline);
  }
  set online(v : boolean) {
    if (this.cuss2) this.cuss2.applicationOnline = v;
  }

  canExit() : boolean {
    const state = this.cuss2?.state;
    return state === ApplicationStateCodeEnum.ACTIVE
  }


  exit() : void {
    this.cuss2?.requestAvailableState();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
