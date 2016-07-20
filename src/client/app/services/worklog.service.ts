
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
// Add all operators to Observable
import 'rxjs/Rx';

import { Worklog } from '../model/worklog';
import { MOCK_WORKLOGS } from './mock-worklogs';
import { MOCK_UPDATED_JIRA_WORKLOG } from './mock-updateHoursInJira';
import { ReportParams } from '../model/report-params';

@Injectable()
export class WorklogService {

  // private _baseUrl = 'http://localhost:9000';
  private _baseUrl = 'https://diy-planty.rhcloud.com';
  // private _baseUrl = 'http://10.95.98.119:9000';

  private _initParamsUrl = this._baseUrl + '/initParams';
  private _worklogsListUrl = this._baseUrl + '/worklogs';
  private _updateJiraHoursUrl = this._baseUrl + '/jiraWorklogHours';
  private _updateCatsHoursUrl = this._baseUrl + '/catsWorklogHours';

  private REPORT_PARAMS_STORAGE_KEY = 'report_params';

  constructor(private _http: Http) {}

  setReportParams(reportParams : ReportParams) {
    localStorage.setItem(this.REPORT_PARAMS_STORAGE_KEY, JSON.stringify(reportParams));
    //localStorage.setItem(this.REPORT_PARAMS_STORAGE_KEY, JSON.stringify(reportParams));
  }

  initReportParams(): Promise<ReportParams> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this._initParamsUrl, options)
                    .toPromise()
                    .then(this.extractConfig)
                    .catch(this.handleError);
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
                    .then(this.extractWorklogs)
                    .catch(this.handleError);
  }

  createWorklogInJira(params: {
    'connConfig': { 'baseUri': string; 'username': string; 'password': string; };
    'key': string; 'date': string; 'tzOffsetMinutes': number; 'duration': number; 'comment': string;
  }): Observable<Response> {

    console.log('>>>>> START worklog-service--updateHoursInJira <<<<<');
    console.log(params);

    let body = JSON.stringify(params);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._updateJiraHoursUrl, body, options);
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
    return this._http.put(this._updateJiraHoursUrl, body, options);
  }

  createWorklogInCats(params: {
    'connConfig': { 'baseUri': string; 'username': string; 'password': string; };
    'key': string; 'date': string; 'tzOffsetMinutes': number; 'duration': number;
    'activityId': string; 'orderId': string; 'suborderIdExt': string;
  }): Observable<Response> {

    console.log('>>>>> START worklog-service--updateHoursInCats <<<<<');
    console.log(params);

    let body = JSON.stringify(params);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._updateCatsHoursUrl, body, options);
  }

  updateHoursInCats(params : any): Observable<Response> {
    console.log('>>>>> START worklog-service--updateHoursInCats <<<<<');
    console.log(params);

    let body = JSON.stringify(params);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this._updateCatsHoursUrl, body, options);
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

private extractConfig(res: Response): ReportParams {
  if (res.status < 200 || res.status >= 300) {
    throw new Error('Bad response status: ' + res.status);
  }
  return res.json();
}

private extractWorklogs(res: Response): Worklog[] {
  if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let matches = res.json().matches;
    return Worklog.fromJsonArray(matches);
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.log(errMsg); // log to console instead
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
