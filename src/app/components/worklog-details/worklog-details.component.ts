
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

import { Worklog } from '../../model/worklog';
import { WorklogService } from '../../services/worklog.service';

@Component({
  selector: 'worklog-detail',
  templateUrl: 'worklog-details.component.html',
  styleUrls: ['worklog-details.component.css']
})
export class WorklogDetailsComponent implements OnInit {
  @Input()
  worklog: Worklog;

  constructor(
    private _route: ActivatedRoute,
    private _worklogService: WorklogService) {
  }

    ngOnInit() {
      console.log('>>>>>> START worklog-details--ngOnInit() <<<<<');
      // let id = +this._routeParams.get('id');
      this._route.queryParams.subscribe(params => {
        let key = params['key'];
        // this._worklogService.getWorklog(key)
        //   .then(worklog => this.worklog = worklog)
      });
    }

    goBack() {
      window.history.back();
    }
}
