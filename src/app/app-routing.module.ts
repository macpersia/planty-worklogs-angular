import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './components/config/config.component';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.component';

const routes: Routes = [
    /*{
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  }, */
  {
    path: 'config',
    component: ConfigComponent
  }, {
    path: 'worklogs',
    component: WorklogsListComponent
    // useAsDefault: true
  },
  {
    path: '*',
    redirectTo: '/worklogs'
  }
  /*, {
    path: '/worklog/:key',
    name: 'WorklogDetails',
    component: WorklogDetailsComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
