export class ReportParams {
  public fromDate: Date = null;
  public toDate: Date = null;
  public jiraParams = new JiraParams();
  public catsParams = new CatsParams();
}

export class JiraParams {
  public baseUrl: string = null;
}

export class CatsParams {
  public baseUrl: string = null;
}
