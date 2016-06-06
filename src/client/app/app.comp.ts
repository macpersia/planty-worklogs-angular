
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated/router';
import { HTTP_PROVIDERS } from '@angular/http';

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
  moduleId: module.id,
  selector: 'worklogs-sync-app',
  templateUrl: 'app.comp.html',
  styleUrls: ['app.comp.css'],
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
    path: '/config',
    name: 'Config',
    component: ConfigComponent
  }, {
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

  title = 'Worklogs Synchronizer';

  //@ViewChild('end') endSidenav: MdSidenav;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService) { }
}
