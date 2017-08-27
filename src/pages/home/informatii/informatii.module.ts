import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Informatii } from './informatii';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    Informatii,
  ],
  imports: [
    IonicPageModule.forChild(Informatii),
    IonicImageViewerModule
  ],
  exports: [
    Informatii
  ]
})
export class InformatiiModule {}
