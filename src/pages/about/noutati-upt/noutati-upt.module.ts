import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoutatiUpt } from './noutati-upt';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    NoutatiUpt,
  ],
  imports: [
    IonicPageModule.forChild(NoutatiUpt),
    IonicImageViewerModule,
    IonicImageLoader
  ],
  exports: [
    NoutatiUpt
  ]
})
export class NoutatiUptModule {}
