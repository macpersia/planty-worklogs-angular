
import { Worklog } from '../model/worklog';

let TIMESTAMP = new Date();
let MILLIS_A_DAY =  24 * 60 * 60 * 1000;
export let MOCK_WORKLOGS: Worklog[] = [{
  key: 'ABC-1',
  date: new Date(TIMESTAMP.valueOf() - MILLIS_A_DAY),
  duration: 0.5,
  description: "My Sample Worklog 1"
}, {
  key: 'ABC-2',
  date: new Date(TIMESTAMP.valueOf()),
  duration: 1.0,
  description: "My Sample Worklog 2"
}, {
  key: 'ABC-3',
  date: new Date(TIMESTAMP.valueOf() + MILLIS_A_DAY),
  duration: 1.5,
  description: "My Sample Worklog 3"
}, {
  key: 'ABC-4',
  date: new Date(TIMESTAMP.valueOf() + MILLIS_A_DAY * 2),
  duration: 2.0,
  description: "My Sample Worklog 4"
}];
