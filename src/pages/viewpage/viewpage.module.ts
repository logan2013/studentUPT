import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Viewpage } from './viewpage';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    Viewpage,
  ],
  imports: [
    IonicPageModule.forChild(Viewpage),
    IonicImageViewerModule
  ],
  exports: [
    Viewpage
  ]
})
export class ViewpageModule {}
