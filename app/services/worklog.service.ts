
import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
// Add all operators to Observable
import 'rxjs/Rx';

import { Worklog } from '../model/worklog';
import { MOCK_WORKLOGS } from './mock-worklogs';
import { ReportParams } from '../model/report-params';

@Injectable()
export class WorklogService {

  // private _worklogsListUrl = 'https://diy-planty.rhcloud.com/worklogs';
  private _worklogsListUrl = 'http://localhost:9000/worklogs';
  private REPORT_PARAMS_STORAGE_KEY = 'report_params';

  constructor(private http: Http) {}

  setReportParams(reportParams : ReportParams) {
    sessionStorage.setItem(this.REPORT_PARAMS_STORAGE_KEY, JSON.stringify(reportParams));
  }

  getReportParams() : ReportParams {
    return JSON.parse(sessionStorage.getItem(this.REPORT_PARAMS_STORAGE_KEY));
  }

  getWorklogsList(params: ReportParams): Promise<Worklog[]> {
    console.log('>>>>> START worklog-service--getWorklogsList <<<<<');
    console.log(params);
    // return new Promise<Worklog[]>((resolve, reject) => {
    //   resolve(MOCK_WORKLOGS);
    // });
    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._worklogsListUrl, body, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json().matches;
    //return body.data || { };
    return body;
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
