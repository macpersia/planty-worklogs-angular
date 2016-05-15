
import { Component, AfterViewInit, ViewChild } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdSidenavLayout, MdSidenav } from '@angular2-material/sidenav/sidenav';

import { WorklogService } from './services/worklog.service';
import { ConfigComponent } from './components/config/config.comp';
//import { DashboardComponent } from './components/dashboard/dashboard.comp';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.comp';
//import { WorklogDetailsComponent } from './components/worklog-details/worklog-details.comp';
import { ReportParams } from './model/report-params';

@Component({
  selector: 'worklogs-sync-app',
  templateUrl: 'app/app.comp.html',
  styleUrls: ['app/app.comp.css'],
  directives: [ //[WorklogsComponent],
    ROUTER_DIRECTIVES,
    MdSidenavLayout, MdSidenav,
    MdButton, MdToolbar,
    ConfigComponent
  ],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    WorklogService
  ]
})
@RouteConfig([
  /*{
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  }, */
  {
    path: '/worklogs',
    name: 'Worklogs',
    component: WorklogsListComponent,
    useAsDefault: true
  }
  /*, {
    path: '/worklog/:key',
    name: 'WorklogDetails',
    component: WorklogDetailsComponent
  } */
])
export class AppComponent { // implements AfterViewInit

  //public reportParams : ReportParams;
  title = 'Worklogs Synchronizer';

  @ViewChild('end') endSidenav: MdSidenav;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService) { }

  /*
  ngAfterViewInit() {
    console.log('>>>>> START app-ngAfterViewInit() <<<<<');
    console.log()
    // this.endSidenav.open();
  } */

  setReportParams(reportParams : ReportParams) {
    console.log('>>>>> START app-setReportParams <<<<<');
    console.log(this._worklogService.getReportParams());
    console.log(reportParams);
    this._worklogService.setReportParams(reportParams);
    console.log(' >>>>> after worklogService.setRP <<<<<');
    console.log(this._worklogService.getReportParams());

    //this.reportParams = reportParams;
    this.endSidenav.close();
    console.log('>>>>> NAVIGATE to Worklogs <<<<<');
    //this._router.navigate([ 'Worklogs' ]);
    this._router.navigateByUrl('/worklog');
  }
}
