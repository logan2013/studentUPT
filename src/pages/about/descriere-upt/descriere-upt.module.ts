import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriereUpt } from './descriere-upt';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DescriereUpt,
  ],
  imports: [
    IonicPageModule.forChild(DescriereUpt),
    IonicImageViewerModule,
    IonicImageLoader
  ],
  exports: [
    DescriereUpt
  ]
})
export class DescriereUptModule {}
