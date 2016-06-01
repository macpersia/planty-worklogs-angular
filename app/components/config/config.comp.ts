
import { Component, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router-deprecated';

import { MdCard } from '@angular2-material/card/card';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput, MdHint } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';

import { WorklogService } from '../../services/worklog.service';

import { ReportParams } from '../../model/report-params';

@Component({
  selector: 'config',
  templateUrl: 'app/components/config/config.comp.html',
  styleUrls: ['app/components/config/config.comp.css'],
  directives: [
    MdCard, MdToolbar, MdInput, MdHint, MdButton
  ],
  providers: [ WorklogService ]
})
export class ConfigComponent {
  private reportParams = new ReportParams();

  constructor(
    private _worklogService: WorklogService,
    private _router: Router) { }

  routerOnActivate() {
    console.log('>>>>> START worklog-list--routerOnActivate() <<<<<');

    console.log(".............GETTING reportParams from sessionStorage...............");
    let storedReportParams = this._worklogService.getReportParams();
    console.log(storedReportParams);
    if (storedReportParams)
      this.reportParams = storedReportParams;
  }

  saveReportParams() {
    console.log('>>>>> config-setReportParams <<<<<');
    console.log(this.reportParams);
    this._worklogService.setReportParams(this.reportParams);

    //navigate to Worklogs page
    this._router.navigate(['Worklogs']);
  }
}
