
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { WorklogService } from './services/worklog.service';
import { DashboardComponent } from './components/dashboard/comp';
import { WorklogsListComponent } from './components/worklogs-list/comp';
import { WorklogDetailsComponent } from './components/worklog-details/comp';

@Component({
  selector: 'worklogs-sync-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Worklogs']">Worklogs</a>
    </nav>
    <router-outlet></router-outlet>`,
  styleUrls: ['app/app.comp.css'],
  directives: [ROUTER_DIRECTIVES], //[WorklogsComponent],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    WorklogService
  ]
})
@RouteConfig([{
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  }, {
    path: '/worklogs',
    name: 'Worklogs',
    component: WorklogsListComponent
  }, {
    path: '/worklog/:key',
    name: 'WorklogDetails',
    component: WorklogDetailsComponent
}])
export class AppComponent {
  title = 'Worklogs Synchronizer';
}
