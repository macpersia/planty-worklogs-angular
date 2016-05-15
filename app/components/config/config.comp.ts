
import { Component, EventEmitter, Output } from 'angular2/core';

import { MdCard } from '@angular2-material/card/card';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput, MdHint } from '@angular2-material/input/input';
import { MdButton } from '@angular2-material/button/button';

import { ReportParams } from '../../model/report-params';

@Component({
  selector: 'config',
  templateUrl: 'app/components/config/config.comp.html',
  styleUrls: ['app/components/config/config.comp.css'],
  directives: [
    MdCard, MdToolbar, MdInput, MdHint, MdButton
  ]
})
export class ConfigComponent {
  private reportParams = new ReportParams();
  @Output() onUpdate: EventEmitter<ReportParams> = new EventEmitter();

  closeSideNav() {
    console.log('>>>>> config-closeSideNav <<<<<');
    console.log(this.reportParams);
    this.onUpdate.emit(this.reportParams);
  }
}
