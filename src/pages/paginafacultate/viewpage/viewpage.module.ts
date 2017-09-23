import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Viewpage } from './viewpage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    Viewpage,
  ],
  imports: [
    IonicPageModule.forChild(Viewpage),
    IonicImageViewerModule,
    IonicImageLoader
  ],
  exports: [
    Viewpage
  ]
})
export class ViewpageModule {}
