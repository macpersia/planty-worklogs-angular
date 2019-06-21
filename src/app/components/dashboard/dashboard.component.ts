
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Worklog } from '../../model/worklog';
import { WorklogService } from '../../services/worklog.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  worklogs: Worklog[] = [];

  constructor(
    private _router: Router,
    private _worklogService: WorklogService) {
  }

  ngOnInit() {
    console.log('>>>>> START dashboard-ngOnInit <<<<<');
    // this._worklogService.getWorklogs()
    //   .then(worklogs => this.worklogs = worklogs.slice(0, 2));
    console.log(this.worklogs);
  }

  gotoDetails(worklog: Worklog) {
    let link = ['WorklogDetails', { key: worklog.key }];
    this._router.navigate(link);
  }
}
