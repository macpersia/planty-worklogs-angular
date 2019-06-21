import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { WorklogService } from './services/worklog.service';
import { ConfigComponent } from './components/config/config.component';
import { WorklogsListComponent } from './components/worklogs-list/worklogs-list.component';
import { WorklogDetailsComponent } from './components/worklog-details/worklog-details.component';
import { MyDateWorkaroudPipe } from './pipes/my-date-workaround-pipe';

@NgModule({
  declarations: [
    AppComponent, ConfigComponent, WorklogsListComponent, WorklogDetailsComponent,
    MyDateWorkaroudPipe
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule,
    MatInputModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatProgressBarModule, 
    MatIconModule
  ],
// directives: [ //[WorklogsComponent],
  //   // ROUTER_DIRECTIVES,
  //   // MdSidenavLayout, MdSidenav,
  //   // MdButton, MdToolbar,
  //   ConfigComponent
  // ],
  providers: [
    // ROUTER_PROVIDERS,
    // HTTP_PROVIDERS,
    WorklogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
