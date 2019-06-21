
import { Component, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';

import { MatCard } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatHint } from '@angular/material/form-field';

import { WorklogService } from '../../services/worklog.service';

import { ReportParams } from '../../model/report-params';

@Component({
  // moduleId: module.id,
  selector: 'config',
  templateUrl: 'config.component.html',
  styleUrls: ['config.component.css'],
  // directives: [
  //   MatCard, MatToolbar, MatInput, MatHint, MatButton
  // ],
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
    else
      this._worklogService.initReportParams()
        .then(params => { if (params) this.reportParams = params; });
  }

  saveReportParams() {
    console.log('>>>>> config-setReportParams <<<<<');
    console.log(this.reportParams);
    this._worklogService.setReportParams(this.reportParams);

    //navigate to Worklogs page
    this._router.navigate(['Worklogs']);
  }
}
