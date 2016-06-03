
import { DateWrapper } from '@angular/core/src/facade/lang';

export class Worklog {
  constructor(
    public key: string,
    public date: Date,
    public description: string,
    public durationInJira: number,
    public durationInCats: number,
    public commentInJira: string
  ) {}

  public static fromJson(obj: any): Worklog {
    return new Worklog(
      undefined,
      DateWrapper.fromISOString(obj.date),
      obj.description,
      obj.durationInJira,
      obj.durationInCats,
      obj.commentInJira
    );
  }

  public static fromJsonArray(jsonArray: any[]): Worklog[] {
    return jsonArray.map(x => Worklog.fromJson(x));
  }
}
