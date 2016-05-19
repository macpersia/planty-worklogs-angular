
import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Worklog } from '../../model/worklog';
import { WorklogService } from '../../services/worklog.service';

@Component({
  selector: 'worklog-detail',
  templateUrl: 'app/components/worklog-details/worklog-details.comp.html',
  styleUrls: ['app/components/worklog-details/worklog-details.comp.css']
})
export class WorklogDetailsComponent implements OnInit {
  @Input()
  worklog: Worklog;

  constructor(
    private _routeParams: RouteParams,
    private _worklogService: WorklogService) {
  }

    ngOnInit() {
      console.log('>>>>>> START worklog-details--ngOnInit() <<<<<');
      // let id = +this._routeParams.get('id');
      let key = this._routeParams.get('key');
      // this._worklogService.getWorklog(key)
      //   .then(worklog => this.worklog = worklog)
    }

    goBack() {
      window.history.back();
    }
}
