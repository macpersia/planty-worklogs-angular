
import { Component, AfterViewInit, ViewChild } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdSidenavLayout, MdSidenav } from '@angular2-material/sidenav/sidenav';

import { WorklogService } from './services/worklog.service';
import { ConfigComponent } from './components/config/config.comp';
import { DashboardComponent } from './components/dashboard/dashboard.comp';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.comp';
import { WorklogDetailsComponent } from './components/worklog-details/worklog-details.comp';
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
@RouteConfig([{
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  }, {
    path: '/worklogs',
    name: 'Worklogs',
    component: WorklogsListComponent,
    useAsDefault: true
  }, {
    path: '/worklog/:key',
    name: 'WorklogDetails',
    component: WorklogDetailsComponent
}])
export class AppComponent implements AfterViewInit {

  title = 'Worklogs Synchronizer';

  @ViewChild('end') endSidenav: MdSidenav;

  ngAfterViewInit() {
    // this.endSidenav.open();
  }
}
