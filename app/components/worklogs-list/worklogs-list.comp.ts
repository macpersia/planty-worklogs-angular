
import { Component, Input } from 'angular2/core';
// import { Router, OnActivate, RouteSegment } from 'angular2/router';
import { Router, OnActivate, RouteData, RouteParams } from 'angular2/router';

import { Worklog } from '../../model/worklog';
import { ReportParams } from '../../model/report-params';
import { WorklogService } from '../../services/worklog.service';
import { WorklogDetailsComponent } from '../worklog-details/worklog-details.comp';
import { MyDateWorkaroudPipe } from '../../pipes/my-date-workaround-pipe';


@Component({
    selector: 'worklogs',
    templateUrl : 'app/components/worklogs-list/worklogs-list.comp.html',
    styleUrls: ['app/components/worklogs-list/worklogs-list.comp.css'],
    pipes: [ MyDateWorkaroudPipe ]
})
export class WorklogsListComponent implements OnActivate {

  worklogs: Worklog[];
  selectedWorklog: Worklog;
  errorMessage;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService,
    private _routeParams : RouteParams ) { }

  routerOnActivate() {
    console.log('>>>>> START worklog-list--routerOnActivate() <<<<<');

    console.log(".............GETTING WORKLOGS with the following reportParams...............");
    let params = this._worklogService.getReportParams();
    console.log(params);

    if (params) {
      params.tzOffsetMinutes = new Date().getTimezoneOffset();
      //this.worklogs = this._worklogService.getWorklogsList(params);
      this._worklogService.getWorklogsList(params)
      .then(
          worklogs => {
            this.worklogs = worklogs;
            console.log(this.worklogs);
          },
          error => this.errorMessage = <any>error
      );
      // .subscribe(
      //   worklogs => this.worklogs = worklogs,
      //   error => this.errorMessage = <any>error
      // );
    }
  }

  addWorklog (date: Date, duration: number, description: string) {
    if (!date || !duration) { return; }
    // this._worklogService.addWorklog(date, duration, description)
    //    .subscribe(
    //      worklog  => this.worklogs.push(worklog),
    //      error =>  this.errorMessage = <any>error);
  }

  onSelect(worklog: Worklog) {
    // if (console) console.log(">>>> clicked on worklog: " + worklog);
    this.selectedWorklog = worklog;
  }

  gotoDetails() {
    this._router.navigate(['WorklogDetails', { key: this.selectedWorklog.key }]);
  }
}
