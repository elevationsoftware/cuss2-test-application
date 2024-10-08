import { Component as AngularComponent, OnInit, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import {ApplicationStateCodes, ApplicationActivation, ApplicationActivationExecutionModeEnum} from "cuss2-typescript-models";
import {Cuss2, logger, Component} from "cuss2";

import ApplicationStateCodeEnum = ApplicationStateCodes
import { StateChange } from 'cuss2/dist/models/stateChange';

const companyLogo = 'LT0146940A020101000000001D01630064006400000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0001240001001E016400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000C4FF9FDEFFC1FCC3FFC1FE7FDEFFC1FCC3FFC1F9C2FF03DCFFC1FCC3FFC1E7C1FF81C1FE07DBFFC1FCC3FF9FC1FC7FC1FFC1F87FDAFFC1FCC2FFC1FE7FC1E3C3FF9FDAFFC1FCC2FFC1FDC1FF3FC3FFC1F3DAFFC1FCC2FFC1F3C1FCC4FFC1FCDAFFC1FCC2FFC1E7C1F3C5FF7FD9FFC1FCC2FFC1DFC1E7C1FFC1F0003FC2FFC1F7D8FFC1FCC2FFBF9FC1FFC20003C2FFC1F9D8FFC1FCC2FFC27FC1F80FC1FFC1C07FC1FFC1FCD8FFC1FCC1FFC1FEC1FCC1FFC1C0C2FFC1FC0FC1FFC1FE7FD7FFC1FCC1FFC1FDC1FBC1FF07C3FF83C2FFBFD7FFC1FCC1FFC1FBC1F7C1FE1FC3FFC1E1C2FFC1DFD7FFC1FCC1FFC1F7C1EFC1F87FC3FFC1F87FC1FFC1EFD7FFC1FCC1FFC1EFC1DFC1F1C4FFC1FE3FC1FFC1E7D7FFC1FCC1FFC1DFBFC1C3C5FF8FC2F7D7FFC1FCC1FFC1DF7F8FC5FFC1C7C2FBD7FFC1FCC1FFBE7F1FC5FFC1E3C2FDD7FFC1FCC1FF7EC1FE3FC5FFC1F1C2FCD7FFC1FCC1FF7DC1FC7FC5FFC1F8C2FED7FFC1FCC1FEC1FBC1F8C6FFC1FCC37FD6FFC1FCC1FCC1F3C1F1C6FFC1FE3FBF7FD6FFC1FCC1FDC1F7C1F3C7FF1FC2BFD6FFC1FCC1FBC1EFC1E7C7FF9FC2DFD6FFC1FCC1FBC1EFC1CFC7FFC1CFC1FFC1DFD6FFC1FCC1F3C1DFC1CFC7FFC1C7C2EFD6FFC1FCC1F7C1DF9FC7FFC2E7C1EFD6FFC1FCC1F7BF3FC7FFC1F3C1F7C1EFD6FFC1FCC1EFBF3FC7FFC1F3C2F7D6FFC1FCC1EF7E3FC7FFC1F9C1FBC1F7D6FFC1FCC1CF7E7FC7FFC1F9C2FBD6FFC1FCC1DF7C7FC7FFC1FCC1FDC1FBD6FFC1FCC1DEC1FCC8FFC1FCC1FDC1FBD6FFC1FCC1DEC1FCC8FFC1FCC2FDD6FFC1FCBEC1F9C1FFC1E00003C1FFC1EFC2FFC1FE7FC1FDC1FFC1C00007C1FFC1DFC1FFC1F7C2FFBFC1FFC1C00007C1FFC1C00007C1FFC1C00FC1FCBDC1F9C1FFC1C00001C1FFC1C3C2FFC1FE7EC1FDC1FF800003C1FF8FC1FFC1E3C2FF1FC1FF800003C1FF800003C1FF8001C1FCBDC1F9C1FFC1C00001C1FFC1C3C2FFC1FE7EC1FDC1FF800003C1FF87C1FFC1C3C1FFC1FE0FC1FF800003C1FF800003C1FF80007CBDC1F9C1FFC1E00003C1FFC1C3C3FF3EC2FFC1C00003C1FF87C1FFC1C3C1FFC1FE0FC1FFC1C00003C1FFC1C00007C1FFC1C0003CBDC1F3C5FFC1C3C3FF3EC1FEC5FFC1C3C1FF87C1FFC1FE0FCAFFC1F81C7DC1F3C5FFC1C3C3FF3F7EC5FFC1C3C1FF87C1FFC1FC07CAFFC1FE0C7FC1F3C5FFC1C3C3FF3F7EC5FFC1E1C1FF8FC1FFC1FC07CBFF0C7BC1F3C5FFC1C3C3FF3FC1FEC5FFC1E1C1FF0FC1FFC1F843C2FFC1E7C6FFC1DFC1FF847BC1F3C5FFC1C3C3FF3FC1FEC5FFC1F1C1FF1FC1FFC1F843C2FFC1C3C6FF8FC1FF847BC1F3C5FFC1C3C3FFBFC1FEC5FFC1F0C1FE1FC1FFC1F0C1E1C2FFC1C3C6FF8FC1FFC1C07BC1F3C5FFC1C3C3FF9FC1FEC5FFC1F0C1FE1FC1FFC1F0C1E1C2FFC1C3C6FF8FC1FFC1C07BC1F3C1FFC1E00001C1FFC1C3C3FF9FC1FEC1FFC1C00003C1FFC1F87E3FC1FFC2F1C2FFC1C3C2FFC1C00003C1FF8FC1FFC1C07BC1F3C1FFC1C00001C1FFC1C3C3FF9FC1FEC1FF800003C1FFC1F87C3FC1FFC1E1C1F0C2FFC1C3C2FF800003C1FF8FC1FFC1C07BC1F3C1FFC1E00001C1FFC1C3C3FF9FC1FEC1FFC1C00003C1FFC1FC7C7FC1FFC1E1C1F0C2FFC1C3C2FF800003C1FF8FC1FFC1C07BC1F3C5FFC1C3C3FF9FC1FEC5FFC1FC387FC1FFC1C3C1F87FC1FFC1C3C6FF8FC1FFC1C07BC1F3C5FFC1C3C3FF3FC1FEC5FFC1FE387FC1FFC1C3C1F87FC1FFC1C3C6FF8FC1FFC1C07BC1F3C5FFC1C3C3FF3FC1FEC5FFC1FE10C2FFC1C7C1FC7FC1FFC1C3C6FF8FC1FF847BC1F3C5FFC1C3C3FF3FC1FEC5FFC1FE10C2FF87C1FC3FC1FFC1C3C6FF8FC1FF847FC1F3C5FFC1C3C3FF3FC1FEC6FF01C2FF87C1FE3FC1FFC1C3C6FF8FC1FF0CBDC1F3C5FFC1C3C3FF3FC1FEC6FF01C2FF0FC1FE1FC1FFC1C3C6FF8FC1FE0CBDC1F3C5FFC1C3C3FF3FC1FEC6FF81C2FF0FC1FE1FC1FFC1C3C6FF8FC1F81CBDC1F9C1FFC1E00003C1FFC1C00003C1FE7FC1FEC1FFC1C00007C2FF83C1FFC1FE1FC1FF1FC1FFC1C3C2FFC1C00007C1FF80003CBDC1F9C1FFC1C00001C1FFC1C00001C1FE7FC2FF800003C2FF83C1FFC1FE1FC1FF0FC1FFC1C3C2FF800003C1FF80007CBDC1F9C1FFC1C00001C1FFC1C00001C1FE7FC1FDC1FF800003C2FFC1C7C1FFC1FE1FC1FF8FC1FFC1C3C2FF800003C1FF8001C1FCC1FEC1FCC1FFC1E00003C1FFC1E00003C1FE7FC1FDC1FFC1C00003C2FFC1E7C2FF3FC1FF9FC1FFC1E7C2FFC1C00007C1FFC1C00FC1FCC1DEC1FCC8FFC1FCC1FFC1FDD6FFC1FCC1DEC1FCC8FFC1FCC1FFC1FDD6FFC1FCC1DF7E7FC7FFC1F9C1FFC1FBD6FFC1FCC1EF7E7FC7FFC1F9C1FFC1FBD6FFC1FCC1EFBF3FC7FFC1F1C1FFC1FBD6FFC1FCC1EFBF3FC7FFC1F3C1FFC1F7D6FFC1FCC1F7BF9FC7FFC1E7C1FFC1F7D6FFC1FCC1F7C1DF9FC7FFC1E7C1FFC1EFD6FFC1FCC1FBC1DFC1CFC7FFC1CFC1FFC1EFD6FFC1FCC1FBC1EFC1C7C7FF8FC1FFC1EFD6FFC1FCC1FDC1E7C1E3C7FF1FC1FFC1DFD6FFC1FCC1FDC1F7C1F3C7FF3FC1FFC1DFD6FFC1FCC1FEC1FBC1F9C6FFC1FE7FC1FFBFD6FFC1FCC1FEC1FBC1FCC6FFC1FCC2FF3FD6FFC1FCC1FF7DC1FE7FC5FFC1F9C2FF7FD6FFC1FCC1FFBEC1FF3FC5FFC1F1C1FFC1FED7FFC1FCC1FFBF7F8FC5FFC1E7C1FFC1FED7FFC1FCC2FF3FC1C7C5FF8FC1FFC1FDD7FFC1FCC2FFC1DFC1E3C5FF1FC1FFC1FBD7FFC1FCC2FFC1CFC1F0C4FFC1FC3FC1FFC1F7D7FFC1FCC2FFC1E7C1FC3FC3FFC1F0C1FFBFC1E7D7FFC1FCC2FFC1F3C1FF0FC3FFC1C3C1FF3FC1EFD7FFC1FCC2FFC1FDC1FFC1C3C3FF0FC1FEC1FFC1DFD7FFC1FCC2FFC1FEC1FFC1F03FC1FFC1F83FC1FDC1FFBFD7FFC1FCC3FF3FC1FC01C1FE00C1FFC1F3C1FF7FD7FFC1FCC3FFC1DFC1FFC1C00007C1FFC1E7C1FED8FFC1FCC3FFC1E7C2FF87C2FF9FC1F9D8FFC1FCC3FFC1F9C4FFC1FE7FC1F3D8FFC1FCC3FFC1FE7FC3FFC1F9C1FFC1EFD8FFC1FCC4FF8FC3FFC1C7C1FF9FD8FFC1FCC4FFC1F1C2FFC1FE3FC1FF7FD8FFC1FCC4FFC1FE1FC1FFC1E1C1FFC1FCD9FFC1FCC5FFC1E0001FC1FFC1F3D9FFC1FCC9FFC1CFD9FFC1FCC9FF3FD9FFC1FCC8FFC1F8DAFFC1FCC8FFC1C7DAFFC1FCC7FFC1F07FDAFFC1FCC6FFC1FC0FDBFFC1FC';

@AngularComponent({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CTA Demo Application';
  private alive: boolean = true;
  cuss2?: Cuss2;
  activationInfo: ApplicationActivation = {
    accessibleMode: false,
    applicationBrand: "??",
    executionMode: ApplicationActivationExecutionModeEnum.DSAM,
    languageID: ""
  }

  connectionStatus = [ "Connecting to CUSS2 platform..." ];
  bppData = { LS: 'waiting for active state', ES: <any> 'waiting for active state', PS: 'waiting for active state',
    assets: 'PT##$S6A#@;#TICK#CHEC#BOAR#0101110112011301210122012301C#0201A34#03BRB061661#0430G25F\n' +
      'TT01#01L08004790100000\n' +
      companyLogo,
    coupon: 'CP#A#01S#CP#C01#02@@01#03M1THIS IS A BARCODE#04THIS IS A BOARDING PASS#'
  };
  btpData = { LS: 'waiting for active state', ES: 'waiting for active state', PS: 'waiting for active state',
    assets: 'BTT0801~J 500262=#01C0M5493450304#02C0M5493450304#03B1MA020250541=06#04B1MK200464141=06#05L0 A258250000#\n' +
      companyLogo,
    coupon: 'BTP080101#01THIS IS A#02BAG TAG#03123#04456#0501#'
  };

  crTimeout = 10000;
  brTimeout = 10000;
  drTimeout = 10000;

  words = 'The optimist invents the airplane and the pessimist the parachute.';
  keys:string[] = []

  get BPP() { return this.cuss2?.boardingPassPrinter; }
  get BTP() { return this.cuss2?.bagTagPrinter; }
  get keypad() { return this.cuss2?.keypad; }
  get barcodeReader() { return this.cuss2?.barcodeReader; }
  get announcement() { return this.cuss2?.announcement; }
  get cardReader() { return this.cuss2?.cardReader; }
  get documentReader() { return this.cuss2?.documentReader; }

  async ngOnInit(): Promise<void> {
    logger.subscribe((x:any) => {
      if (x.level !== 'info') return;
      this.connectionStatus.push(x.action);
    });
    const searchParams = new URLSearchParams(location.search);
    let cussInfo: any = environment;
    if (searchParams.has('CUSS-WSS')) {
      cussInfo = {
        cussUrl: searchParams.get('CUSS-WSS'),
        oauthUrl: searchParams.has('OAUTH-URL'),
        clientId: searchParams.get('CLIENT-ID') || searchParams.get('client-id'),
        clientSecret: searchParams.get('CLIENT-SECRET') || searchParams.get('client-secret'),
        deviceID: searchParams.get('DEVICE-ID') || searchParams.get('device-id'),
      }
    }

    try {
      // @ts-ignore
      this.cuss2 = await Cuss2.connect(cussInfo.cussUrl, cussInfo.oauthUrl, cussInfo.deviceID, cussInfo.clientId, cussInfo.clientSecret);
    }
    catch(e) {
      console.error(e);
      this.connectionStatus.push(e.message);
    }

    if (!this.cuss2) {
      return;
    }
    const cuss2 = this.cuss2;
    this.activationInfo.applicationBrand = cuss2.connection._auth.client_id

    cuss2.stateChange.subscribe(async (state: StateChange) => {
      this.title = state.current;
    });

  
    if (cuss2.keypad) {
      cuss2.keypad.data.subscribe((keys) => {
        this.keys = Object.entries(keys).filter(e => e[1]).map(e => e[0]);
      })
    }

    // @ts-ignore
    window.cuss2 = cuss2;
    // @ts-ignore
    window.appComponent = this

    cuss2.activated.subscribe(async (activationInfo) => {
      this.activationInfo = activationInfo
      console.log('APPLICATION ACTIVATED');
    });

    cuss2.deactivated.subscribe(async (current) => {
      console.log('APPLICATION DEACTIVATED - now: ' + current);
    });

    cuss2.applicationOnline = true;

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

  printBoardingPass() : void {
    const assets = this.bppData.assets.split(/[\r\n]/g).filter(a => !!a.trim().length)
    this.cuss2?.boardingPassPrinter?.setupAndPrintRaw(assets, this.bppData.coupon);
  }

  async printBagTag() {
    const assets = this.btpData.assets.split(/[\r\n]/g).filter(a => !!a.trim().length)
    this.cuss2?.bagTagPrinter?.setupAndPrintRaw(assets, this.btpData.coupon);
  }

  toggleEnabled(name:number|undefined) : void {
    if (!this.cuss2) return;
    const c = this.cuss2.components[String(name)];
    if (c.enabled) c.disable();
    else c.enable();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
