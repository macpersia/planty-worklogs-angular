
import { Component, Input, OnInit } from '@angular/core';
// import { Router, OnActivate, RouteSegment } from '@angular/router-deprecated';
import { Router, OnActivate, RouteData, RouteParams } from '@angular/router-deprecated';

import { MdCard } from '@angular2-material/card/card';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput, MdHint } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';
import { MdProgressBar } from '@angular2-material/progress-bar/progress-bar';
import { MdProgressCircle } from '@angular2-material/progress-circle/progress-circle';

import { Worklog } from '../../model/worklog';
import { ReportParams } from '../../model/report-params';
import { WorklogService } from '../../services/worklog.service';
import { WorklogDetailsComponent } from '../worklog-details/worklog-details.comp';
import { MyDateWorkaroudPipe } from '../../pipes/my-date-workaround-pipe';


@Component({
    selector: 'worklogs',
    templateUrl : 'app/components/worklogs-list/worklogs-list.comp.html',
    styleUrls: ['app/components/worklogs-list/worklogs-list.comp.css'],
    pipes: [ MyDateWorkaroudPipe ],
    directives: [
      MdCard, MdToolbar, MdInput, MdHint, MdButton,
      MdProgressBar, MdProgressCircle
    ]
})
export class WorklogsListComponent implements OnInit, OnActivate { // OnActivate

  private reportParams = new ReportParams();
  worklogs: Worklog[];
  selectedWorklog: Worklog;
  errorMessage;
  isLoading = false;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService,
    private _routeParams : RouteParams ) { }

  ngOnInit() {
    console.log('>>>>> START worklogs-list--ngOnInit');

    if (this._worklogService.getReportParams() !== null) {
      this.reportParams = this._worklogService.getReportParams();
    }
    console.log(this.reportParams);
  }

  isReportParamsValid(reportParams : ReportParams) : boolean {
    let isValid = true;

    if (reportParams === null || reportParams === undefined
          || reportParams.fromDate === null || reportParams.fromDate === undefined
          || reportParams.toDate === null || reportParams.toDate === undefined
          || reportParams.catsParams === null || reportParams.catsParams === undefined
          || reportParams.catsParams.baseUrl === null || reportParams.catsParams.baseUrl === undefined
          || reportParams.catsParams.password === null || reportParams.catsParams.password === undefined
          || reportParams.catsParams.username === null || reportParams.catsParams.username === undefined
          || reportParams.jiraParams === null || reportParams.jiraParams === undefined
          || reportParams.jiraParams.baseUrl === null || reportParams.jiraParams.baseUrl === undefined
          || reportParams.jiraParams.username === null || reportParams.jiraParams.username === undefined
          || reportParams.jiraParams.password === null || reportParams.jiraParams.password === undefined
          || reportParams.jiraParams.jiraQuery === null || reportParams.jiraParams.jiraQuery === undefined
          || reportParams.jiraParams.author === null || reportParams.jiraParams.author === undefined
    ) {
      isValid = false;
    }
    return isValid;
  }

  routerOnActivate() {
    console.log('>>>>> START worklog-list--routerOnActivate() <<<<<');

    console.log(".............GETTING WORKLOGS with the following reportParams...............");
    let params = this._worklogService.getReportParams();
    console.log(params);

    if (this.isReportParamsValid(params)) {
      this.getWorklogs(params);
      // .subscribe(
      //   worklogs => this.worklogs = worklogs,
      //   error => this.errorMessage = <any>error
      // );
    }
  }

  retrieveWorklogs() {
    console.log('>>>>> START worklogs-list--retrieveWorklogs()');
    console.log(this.reportParams);
    //this.getWorklogs(this.reportParams);

    if (this.reportParams) {
      this.isLoading = true;
      //update the reportParams on sessionStorage
      this._worklogService.setReportParams(this.reportParams);

      this.reportParams.tzOffsetMinutes = new Date().getTimezoneOffset();
      //this.worklogs = this._worklogService.getWorklogsList(params);
      this._worklogService.getWorklogsList(this.reportParams)
      .then(
          worklogs => {
            this.worklogs = worklogs;
            this.isLoading = false;
            console.log('>>> successfully retrieved the folowwing worklogs: ');
            console.log(this.worklogs);
          },
          error => {
            this.errorMessage = <any>error
            this.isLoading = false;
          }
      );
    }
  }

  getWorklogs(params: ReportParams) {
    params.tzOffsetMinutes = new Date().getTimezoneOffset();
    //this.worklogs = this._worklogService.getWorklogsList(params);
    this._worklogService.getWorklogsList(params)
    .then(
        worklogs => {
          this.worklogs = worklogs;
          console.log('>>> successfully retrieved the folowwing worklogs: ');
          console.log(this.worklogs);
        },
        error => this.errorMessage = <any>error
    );
  }

  isSynchronized = (worklog: Worklog) => worklog.durationInJira == worklog.durationInCats;

  updateJira(worklog : Worklog) {
    console.log('>>>>> START updateJira()');
    console.log(worklog);
    if (worklog.durationInJira === undefined) {
      console.log('............ ADD entry in JIRA ............');
    } else if (worklog.durationInCats && worklog.durationInCats != worklog.durationInJira) {
      console.log('............ UPDATE hours in JIRA ............');

      let jiraConnConfig = {
        'baseUri': this.reportParams.jiraParams.baseUrl,
        'username': this.reportParams.jiraParams.username,
        'password': this.reportParams.jiraParams.password
      }

      let params = {
        'connConfig': jiraConnConfig,
        'key': worklog.description,
        'date': new MyDateWorkaroudPipe().transform(worklog.date, []),
        'duration': worklog.durationInCats
      };

      let status = this._worklogService.updateHoursInJira(params)
      .subscribe(
        res => {
          console.log('....................what is res');
          console.log(res);
          console.log(res.status);
          console.log(res.statusText);
          if (res.statusText === 'Ok') {
          console.log('>>> successfully updated the hours in Jira from: ' +worklog.durationInJira +' to: ' +worklog.durationInCats);
          worklog.durationInJira = worklog.durationInCats;
        }
      },
        error => {}
      );

      /*
      this._worklogService.updateHoursInJira(params)
      .then(
          _worklog => {
            //worklog = _worklog;
            worklog.durationInJira = worklog.durationInCats;
            console.log('>>> successfully updated the hours in Jira from the ff worklog: ');
            console.log('=> OLD hours: ' +worklog.durationInJira);
            console.log('=> NEW hours: ' +_worklog.durationInJira);
          },
          error => this.errorMessage = <any>error
      ); */

    }
  }

  updateCats(worklog : Worklog) {
    console.log('>>>>> START updateCats()');
    console.log(worklog);
    if (worklog.durationInCats === undefined) {
      console.log('............ ADD entry in CATS ............');
    } else if (worklog.durationInJira && worklog.durationInJira != worklog.durationInCats) {
      console.log('............ UPDATE hours in CATS ............');
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
    // // if (console) console.log(">>>> clicked on worklog: " + worklog);
    // this.selectedWorklog = worklog;
  }

  gotoDetails() {
    this._router.navigate(['WorklogDetails', { key: this.selectedWorklog.key }]);
  }
}
