import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MdSidenavLayout, MdSidenav } from '@angular/material/sidenav';

import { WorklogService } from './services/worklog.service';
import { ConfigComponent } from './components/config/config.component';
//import { DashboardComponent } from './components/dashboard/dashboard.comp';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.component';
//import { WorklogDetailsComponent } from './components/worklog-details/worklog-details.comp';
import { ReportParams } from './model/report-params';

@Component({
  selector: 'worklogs-sync-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { // implements AfterViewInit

  title = 'Worklogs Synchronizer';

  //@ViewChild('end') endSidenav: MdSidenav;

  constructor(
    private _router: Router,
    private _worklogService: WorklogService) { }
}
