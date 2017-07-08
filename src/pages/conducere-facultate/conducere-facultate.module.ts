import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConducereFacultate } from './conducere-facultate';

@NgModule({
  declarations: [
    ConducereFacultate,
  ],
  imports: [
    IonicPageModule.forChild(ConducereFacultate),
  ],
  exports: [
    ConducereFacultate
  ]
})
export class ConducereFacultateModule {}
