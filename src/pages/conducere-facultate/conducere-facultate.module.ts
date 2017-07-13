import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConducereFacultate } from './conducere-facultate';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ConducereFacultate,
  ],
  imports: [
    IonicPageModule.forChild(ConducereFacultate),
    IonicImageViewerModule
  ],
  exports: [
    ConducereFacultate
  ]
})
export class ConducereFacultateModule {}
