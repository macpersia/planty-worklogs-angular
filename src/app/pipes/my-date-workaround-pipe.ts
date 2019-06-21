// import {
//   isDate,
//   isNumber,
//   isPresent,
//   Date,
//   DateWrapper,
//   // CONST,
//   isBlank,
//   FunctionWrapper
// } from '@angular/core/src/facade/lang';
// import {DateFormatter} from '@angular/common/src/facade/intl';
// import {PipeTransform, WrappedValue, Pipe, Injectable, BaseException} from '@angular/core';
// import {StringMapWrapper, ListWrapper} from '@angular/core/src/facade/collection';

// import {InvalidPipeArgumentException} from '@angular/core/src/facade/exceptions';

import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { isNumber, isDate } from 'util';
import * as moment from 'moment';

// @CONST()
@Pipe({name: 'myDateWorkaround', pure: true})
@Injectable()
export class MyDateWorkaroudPipe implements PipeTransform {

  transform(value: any, args: any): string {
    if (!value || /$\s*^/.test(value)) return null;

    if (!this.supports(value)) {
      // throw new InvalidPipeArgumentException(MyDateWorkaroudPipe, value);
      throw new Error(`InvalidPipeArgument: ${MyDateWorkaroudPipe}, ${value}`);
    }
    if (isNumber(value)) {

      // value = DateWrapper.fromMillis(value);
      value = moment(value).toDate();
    }
    // return DateFormatter.format(value, undefined, 'y MM dd');

    // let yearStr = DateFormatter.format(value, undefined, 'y');
    // let monthStr = DateFormatter.format(value, undefined, 'MM');
    // let dayStr = DateFormatter.format(value, undefined, 'dd');
    const theMoment = moment(value);
    let yearStr = theMoment.format('y');
    let monthStr = theMoment.format('MM');
    let dayStr = theMoment.format('dd');

    return yearStr + '-' + monthStr + '-' + dayStr;
  }

  supports(obj: any): boolean { return isDate(obj) || isNumber(obj); }
}
