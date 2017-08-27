import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriereUpt } from './descriere-upt';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    DescriereUpt,
  ],
  imports: [
    IonicPageModule.forChild(DescriereUpt),
    IonicImageViewerModule
  ],
  exports: [
    DescriereUpt
  ]
})
export class DescriereUptModule {}
