// import { DateWrapper } from '@angular/core/src/facade/lang';
import * as moment from 'moment';

export class Worklog {
  constructor(
    public key: string,
    public date: Date,
    public description: string,
    public durationInJira: number,
    public durationInCats: number,
    public commentInJira: string,
    public activityIdInCats: string,
    public orderIdInCats: string,
    public suborderIdExtInCats: string
  ) {}

  public static fromJson(obj: any): Worklog {
    moment().format
    return new Worklog(
      undefined,

      // DateWrapper.fromISOString(obj.date),
      moment.utc(obj.date).toDate(),

      obj.description,
      obj.durationInJira,
      obj.durationInCats,
      obj.commentInJira,
      obj.activityIdInCats,
      obj.orderIdInCats,
      obj.suborderIdExtInCats
    );
  }

  public static fromJsonArray(jsonArray: any[]): Worklog[] {
    return jsonArray.map(x => Worklog.fromJson(x));
  }
}
