import {
  isDate,
  isNumber,
  isPresent,
  Date,
  DateWrapper,
  CONST,
  isBlank,
  FunctionWrapper
} from 'angular2/src/facade/lang';
import {DateFormatter} from 'angular2/src/facade/intl';
import {PipeTransform, WrappedValue, Pipe, Injectable} from 'angular2/core';
import {StringMapWrapper, ListWrapper} from 'angular2/src/facade/collection';

import {InvalidPipeArgumentException} from 'angular2/src/common/pipes/invalid_pipe_argument_exception';


@CONST()
@Pipe({name: 'myDateWorkaround', pure: true})
@Injectable()
export class MyDateWorkaroudPipe implements PipeTransform {

  transform(value: any, args: any): string {
    if (isBlank(value)) return null;

    if (!this.supports(value)) {
      throw new InvalidPipeArgumentException(MyDateWorkaroudPipe, value);
    }
    if (isNumber(value)) {
      value = DateWrapper.fromMillis(value);
    }
    // return DateFormatter.format(value, undefined, 'y MM dd');
    let yearStr = DateFormatter.format(value, undefined, 'y');
    let monthStr = DateFormatter.format(value, undefined, 'MM');
    let dayStr = DateFormatter.format(value, undefined, 'dd');
    return yearStr + '-' + monthStr + '-' + dayStr;
  }

  supports(obj: any): boolean { return isDate(obj) || isNumber(obj); }
}
