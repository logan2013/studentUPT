import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoutatiUpt } from './noutati-upt';

@NgModule({
  declarations: [
    NoutatiUpt,
  ],
  imports: [
    IonicPageModule.forChild(NoutatiUpt),
  ],
  exports: [
    NoutatiUpt
  ]
})
export class NoutatiUptModule {}
