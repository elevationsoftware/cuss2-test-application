import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '../environments/environment';
import { Cuss2Service, ICuss2ServiceOptions } from '@elevated-libs/cuss2-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cuss2-example-angular';
  private alive: boolean = true;

  constructor(private cuss2Service: Cuss2Service){}

  async ngOnInit(): Promise<void> {
    // TODO: make it so the config only has to be passed in on module creation
    await this.cuss2Service.start(environment.cuss2Config as ICuss2ServiceOptions);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
