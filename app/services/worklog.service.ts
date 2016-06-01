
import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
// Add all operators to Observable
import 'rxjs/Rx';

import { Worklog } from '../model/worklog';
import { MOCK_WORKLOGS } from './mock-worklogs';
import { MOCK_UPDATED_JIRA_WORKLOG } from './mock-updateHoursInJira';
import { ReportParams } from '../model/report-params';

@Injectable()
export class WorklogService {

  // private _worklogsListUrl = 'https://diy-planty.rhcloud.com/worklogs';
  //private _worklogsListUrl = 'http://localhost:9000/worklogs';
  private _worklogsListUrl = 'http://10.95.98.119:9000/worklogs';
  private _updateHoursInJira = 'http://10.95.98.119:9000/worklogHours';
  private REPORT_PARAMS_STORAGE_KEY = 'report_params';

  constructor(private _http: Http) {}

  setReportParams(reportParams : ReportParams) {
    localStorage.setItem(this.REPORT_PARAMS_STORAGE_KEY, JSON.stringify(reportParams));
    //localStorage.setItem(this.REPORT_PARAMS_STORAGE_KEY, JSON.stringify(reportParams));
  }

  getReportParams() : ReportParams {
    return JSON.parse(localStorage.getItem(this.REPORT_PARAMS_STORAGE_KEY));
  }

  getWorklogsList(params: ReportParams): Promise<Worklog[]> {
    console.log('>>>>> START worklog-service--getWorklogsList <<<<<');
    // console.log(params);
    // return new Promise<Worklog[]>((resolve, reject) => {
    //   resolve(MOCK_WORKLOGS);
    // });
    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._worklogsListUrl, body, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  updateHoursInJira(params : any): Observable<Response> {
    console.log('>>>>> START worklog-service--updateHoursInJira <<<<<');
    console.log(params);

    let body = JSON.stringify(params);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //return MOCK_UPDATED_JIRA_WORKLOG;
    /*
     return new Promise<Worklog>((resolve, reject) => {
       resolve(MOCK_UPDATED_JIRA_WORKLOG);
     }); */

     //return this.extractResponseStatus();

    // this.http.put(this._updateHoursInJira, body, options)
    return this.http.put(this._updateHoursInJira, body, options);
  }

  private extractResponseStatus(res: Response): string { //res: Response
    /*
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    } */
    //let matches = res.json().matches;
    //return res.status;
    return res.statusText;
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let matches = res.json().matches;
    return Worklog.fromJsonArray(matches);
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

  // getWorklogs() {
  //   return Promise.resolve(MOCK_WORKLOGS);
  //   // return new Promise(resolve =>
  //   //   setTimeout(() => resolve(MOCK_WORKLOGS), 2000) // 2 seconds
  //   // );
  // }
  //
  // getWorklog(key: string) {
  //   return Promise.resolve(MOCK_WORKLOGS).then(
  //     worklogs => worklogs.filter(worklog => worklog.key === key)[0]
  //   );
  // }
  //
  // // addWorklog(date: Date, duration: number, description: string) {
  // //   // not imeplemented yet!
  // // }
}
