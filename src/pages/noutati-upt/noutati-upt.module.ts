import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoutatiUpt } from './noutati-upt';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    NoutatiUpt,
  ],
  imports: [
    IonicPageModule.forChild(NoutatiUpt),
    IonicImageViewerModule
  ],
  exports: [
    NoutatiUpt
  ]
})
export class NoutatiUptModule {}
