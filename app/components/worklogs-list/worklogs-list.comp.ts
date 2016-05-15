
import { Component, Input } from 'angular2/core';
// import { Router, OnActivate, RouteSegment } from 'angular2/router';
import { Router, OnActivate, RouteData, RouteParams } from 'angular2/router';

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
    private _worklogService: WorklogService,
    private _routeParams : RouteParams ) { }

  routerOnActivate() {
    console.log('>>>>> START worklog-list--routerOnActivate() <<<<<');
    console.log(this._worklogService.getReportParams());

    //console.log(this._data.get('reportParams'));
    let params : ReportParams; // = reportParams;

    console.log(".............GETTING WORKLOGS...............");
    console.log(params);

    console.log('>>>>> retrieve worklogs <<<<<');
    console.log(this._worklogService.getReportParams());

    //this.navigationCategories = this.CategoryService.getDataRootCategoryChildren(true);
    if (params !== null && params !== undefined)
      this.worklogs = this._worklogService.getWorklogsList(params);
    /*.subscribe(
        data => { this.navigationCategories = data; },
        err => { this._error.handleErrorResponse(err); },
        () => { console.log("category-navigation--loadNavigationCategories--()---successfully loaded data root categories"); console.log(this.navigationCategories.length);
                this.flatNavigationCategoryList = this.getNavigationCategoryList(); }
        ); */


    /* this._worklogService.getWorklogsList(params)
      .then(
          worklogs => this.worklogs = worklogs,
          error => this.errorMessage = <any>error
      ); */
      console.log(this.worklogs);
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
