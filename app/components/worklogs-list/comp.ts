
import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Worklog } from '../../model/worklog';
import { WorklogService } from '../../services/worklog.service';
import { WorklogDetailsComponent } from '../worklog-details/comp';


@Component({
    selector: 'worklogs',
    templateUrl : 'app/components/worklogs-list/comp.html',
    styleUrls: ['app/components/worklogs-list/comp.css']
})
export class WorklogsListComponent implements OnInit {
  worklogs: Worklog[];
  selectedWorklog: Worklog;
  errorMessage;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService) {}

  ngOnInit() {
    this.getWorklogs();
  }

  getWorklogs() {
    console.log(".............GETTING WORKLOGS...............");
    this._worklogService.getWorklogsList()
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
