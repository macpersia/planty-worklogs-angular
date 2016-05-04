export class ReportParams {
  fromDate: string = null;  // date in format yyyy-MM-dd
  toDate: string = null;    // date in format yyyy-MM-dd
  tzOffsetMinutes: number;
  jiraParams = new JiraParams();
  catsParams = new CatsParams();
}

export class JiraParams {
  public baseUrl: string = null;
  public username: string = null;
  public password: string = null;
  public jiraQuery: string = null;
  public author: string = null;
}

export class CatsParams {
  public baseUrl: string = null;
  public username: string = null;
  public password: string = null;
}
