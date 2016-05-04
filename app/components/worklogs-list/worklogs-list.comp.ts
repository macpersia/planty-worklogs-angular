
import { Component, Input } from 'angular2/core';
// import { Router, OnActivate, RouteSegment } from 'angular2/router';
import { Router, OnActivate } from 'angular2/router';

import { Worklog } from '../../model/worklog';
import { ReportParams } from '../../model/report-params';
import { WorklogService } from '../../services/worklog.service';
import { WorklogDetailsComponent } from '../worklog-details/worklog-details.comp';


@Component({
    selector: 'worklogs',
    templateUrl : 'app/components/worklogs-list/worklogs-list.comp.html',
    styleUrls: ['app/components/worklogs-list/worklogs-list.comp.css']
})
export class WorklogsListComponent implements OnActivate {

  worklogs: Worklog[];
  selectedWorklog: Worklog;
  errorMessage;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService) {}

  routerOnActivate() {
    let params = new ReportParams();
    let TIMESTAMP = new Date();
    let MILLIS_A_DAY =  24 * 60 * 60 * 1000;
    params.fromDate = "2016-04-27";
    params.toDate = "2016-05-05";
    params.tzOffsetMinutes = -480;
    params.jiraParams.baseUrl = "https://jira02.jirahosting.de/jira";
    params.jiraParams.username = "myuser";
    params.jiraParams.password = "mypass";
    params.jiraParams.jiraQuery = "project = BICM";
    params.jiraParams.author = undefined;
    params.catsParams.baseUrl = "https://cats.arvato-systems.de/gui4cats-webapi";
    params.catsParams.username = "myuser";
    params.catsParams.password = "mypass";
    console.log(".............GETTING WORKLOGS...............");
    this._worklogService.getWorklogsList(params)
      .then(
          worklogs => this.worklogs = worklogs,
          error => this.errorMessage = <any>error
      );
      // .subscribe(
      //   worklogs => this.worklogs = worklogs,
      //   error => this.errorMessage = <any>error
      // );
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
